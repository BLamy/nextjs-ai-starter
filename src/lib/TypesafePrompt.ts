import { z } from "zod";
import * as Tools from "@/ai/tools";
import chalk from "chalk";
import {
  assistant,
  generateChatCompletion,
  system,
  user,
} from "@/lib/ChatCompletion";
import { ChatCompletionRequestMessage } from "openai";
import { isValidTool } from "@/lib/Utils";
import { ZodSchema } from "zod";
import { zodToTs, createTypeAlias, printNode } from 'zod-to-ts'
import basicPreamble from '@/lib/preambles/basic.turbo.Prompt.txt';
// import toolsPreamble from './preambles/tools.turbo.Prompt.txt';

type Result<TOutput, TError> = ({ res: TOutput } | { error: TError }) & {
  messages: ChatCompletionRequestMessage[];
};
export type ErrorHandler = (
  error: string,
  messages: ChatCompletionRequestMessage[]
) => Promise<ChatCompletionRequestMessage[] | void>;

// TODO move this prompt to the prompt file
const createReflectionPromptForError = (
  error: string
) => `USER: I tried to parse your output against the schema and I got this error ${error}. Did your previous response match the expected Output format? Remember no values in your response cannot be null or undefined unless they are marked with a Question Mark in the typescript type. If you believe your output is correct please repeat it. If not, please print an updated valid output or an error. Remember nothing other than valid JSON can be sent to the user
ASSISTANT: My previous response did not match the expected Output format. Here is either the updated valid output or a relevant error from the Errors union:\n`;

export default class TypesafePrompt<
  TPrompt extends string,
  TInput extends ZodSchema,
  TOutput extends ZodSchema
  // TErrors extends string
> {
  constructor(
    private prompt: TPrompt,
    private inputSchema: TInput,
    private outputSchema: TOutput,
    private examples: ChatCompletionRequestMessage[] = [],
    // private tools: TTools,
    private config?: {
      skipInputValidation?: boolean;
    }
  ) {
    this.config = config ?? { skipInputValidation: false };
  }

  async run<TError extends string>(
    input: z.infer<TInput>,
    errorHandlers: {
      [TKey in TError | "unknown" | "type validation error"]: ErrorHandler;
    }
  ): Promise<Result<TOutput, TError | "unknown" | "type validation error">> {
    if (!this.config?.skipInputValidation) {
      const inputValidation = this.inputSchema.safeParse(input);
      if (!inputValidation.success) {
        const error = "type validation error";
        const messages: ChatCompletionRequestMessage[] = [
          system(inputValidation.error.message),
        ];
        await errorHandlers[error](error, messages);
        return { error, messages };
      }
    }

    let inputType = printNode(
      zodToTs(this.inputSchema, 'Input').node,
    ).replace(/\r?\n\s*/g, '').replace(/;/g, ', ').replace(', }', '}');
    if (inputType.endsWith('[]')) {
      inputType = `Array<${inputType.slice(0, -2)}>`;
    }

    let outputType = printNode(
      zodToTs(this.outputSchema, 'Output').node,
    ).replace(/\r?\n\s*/g, '').replace(/;/g, ', ').replace(', }', '}');
    if (outputType.endsWith('[]')) {
      outputType = `Array<${outputType.slice(0, -2)}>`;
    }
    let systemPrompt = basicPreamble;
    if (this.examples.length > 0) {
      systemPrompt += `\n### Examples${this.examples.reduce((acc, example) => {
        return `${acc}\n${example.role.toUpperCase()}: ${example.content}`;
      }, "")}`
    }

    systemPrompt += "\n### Typescript\n";
    systemPrompt += `export type Prompt = "${this.prompt}"\n`;
    systemPrompt += `export type Input = ${inputType}\n`;
    systemPrompt += `export type Output = ${outputType}\n`;
    systemPrompt += `export type Errors = ${Object.keys(errorHandlers).map(key => JSON.stringify(key)).join(' | ')};\n`;

    const systemMessage = system(systemPrompt);

    console.log(chalk.green(`SYSTEM: ${systemMessage.content}`));
    console.log(chalk.blue(`USER: ${JSON.stringify(input, null, 2)}`));
    let messages: ChatCompletionRequestMessage[] = [
      systemMessage,
      user(JSON.stringify(input)),
    ];
    // There are only two tools so if it loops more than twice, something is wrong.
    const TOOL_STACK_OVERFLOW_THRESHOLD = 5;
    for (let i = 0; i <= TOOL_STACK_OVERFLOW_THRESHOLD; i++) {
      let chatCompletion = await generateChatCompletion(messages);
      console.log(
        chalk.gray(`ASSISTANT: ${JSON.stringify(chatCompletion, null, 2)}`)
      );
      messages.push(assistant(JSON.stringify(chatCompletion)));

      if (typeof chatCompletion === "string") {
        const reflectionPrompt = createReflectionPromptForError(
          "output was not a JSON object. Recieved string."
        );
        console.log(chalk.green(`SYSTEM: ${reflectionPrompt}`));
        messages.push(system(reflectionPrompt));
        chatCompletion = await generateChatCompletion(messages);
        console.log(
          chalk.gray(`ASSISTANT: ${JSON.stringify(chatCompletion, null, 2)}`)
        );
        messages.push(assistant(JSON.stringify(chatCompletion)));
        if (typeof chatCompletion === "string") {
          const error = "output format error";
          const content = JSON.stringify({
            error,
            msg: "After two attempts, the output format was not correct.",
          });
          console.error(chalk.red(`SYSTEM: ${content}`));
          messages.push(system(content));
          return { error: "unknown", messages };
        }
      }
      
      if ("error" in chatCompletion) {
        console.error(
          chalk.red(`SYSTEM: ${JSON.stringify(chatCompletion, null, 2)}`)
        );
        return { error: chatCompletion.error, messages };
      }

      if ("tool" in chatCompletion) {
        if (isValidTool(chatCompletion.tool)) {
          const response = await Tools[chatCompletion.tool](
            chatCompletion.args
          );
          console.log(
            chalk.gray(`ASSISTANT: ${JSON.stringify(response, null, 2)}`)
          );
          messages.push(assistant(response));
        } else {
          const err = `HALLUCINATION: Unknown tool. ${JSON.stringify(
            messages,
            null,
            2
          )}`;
          console.error(chalk.red(`SYSTEM: ${err}`));
          return { error: chatCompletion.error, messages };
        }
      } else {
        let response = this.outputSchema.safeParse(chatCompletion);
        if (response.success) {
          return { res: response.data, messages };
        }
        const reflectionPromptWithZodError = createReflectionPromptForError(
          response.error.message
        );
        messages.push(system(reflectionPromptWithZodError));
        console.log(chalk.green(`SYSTEM: ${reflectionPromptWithZodError}`));
      }
    }
    const err = `STACK OVERFLOW: Too many tools used. ${JSON.stringify(
      messages
    )}`;
    console.error(chalk.red(`SYSTEM: ${err}`));
    return { error: "unknown", messages };
  }
}

type tests = [];
