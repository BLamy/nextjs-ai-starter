import { z } from "zod";
import * as Tools from "@/ai/tools";
import chalk from "chalk";
import { generateChatCompletion } from "@/lib/ChatCompletion";
import { ChatCompletionRequestMessage } from "openai";
import { isValidTool } from "@/lib/Utils";
import { ZodSchema } from "zod";

type Result<TOutput, TError> = ({ res: TOutput } | { error: TError }) & {
  messages: ChatCompletionRequestMessage[];
};
type ErrorHandler = (error: string, messages: ChatCompletionRequestMessage[]) => Promise<ChatCompletionRequestMessage[] | void>;

// TODO move this prompt to the prompt file
const createReflectionPromptForError = (
  error: string
) => `USER: I tried to parse your output against the schema and I got this error ${error}. Did your previous response match the expected Output format? Remember no values in your response cannot be null or undefined unless they are marked with a Question Mark in the typescript type. If you believe your output is correct please repeat it. If not, please print an updated valid output or an error. Remember nothing other than valid JSON can be sent to the user
ASSISTANT: My previous response did not match the expected Output format. Here is either the updated valid output or a relevant error from the Errors union:\n`;

export default class TypesafePrompt<
  TPrompt extends string,
  TInput extends ZodSchema,
  TOutput extends ZodSchema,
> {
  constructor(
    private prompt: TPrompt,
    private inputSchema: TInput,
    private outputSchema: TOutput,
    private config?: {
      skipInputValidation?: boolean;
    }
  ) {
    this.config = config ?? { skipInputValidation: false };
  }

  async run<TError extends string>(
    input: z.infer<TInput>,
    errorHandlers: { [TKey in (TError | "unknown" | "zod validation error" | "output format error")]: ErrorHandler }
  ): Promise<Result<TOutput, (TError | "unknown" | "zod validation error" | "output format error")>> {
    if (!this.config?.skipInputValidation) {
      const inputValidation = this.inputSchema.safeParse(input);
      if (!inputValidation.success) {
        const error = "zod validation error";
        const messages: ChatCompletionRequestMessage[] = [{ role: "system", content: "todo error" }];
        await errorHandlers[error](error, messages);
        return { error, messages };
      }
    }
    console.log(chalk.green(`SYSTEM: ${this.prompt}`));
    console.log(chalk.blue(`USER: ${JSON.stringify(input, null, 2)}`));
    let messages: ChatCompletionRequestMessage[] = [
      {
        role: "system",
        content: this.prompt,
      },
      {
        role: "user",
        content: JSON.stringify(input),
      },
    ];
    // There are only two tools so if it loops more than twice, something is wrong.
    const TOOL_STACK_OVERFLOW_THRESHOLD = 5;
    let errorCount = 0;
    for (let i = 0; i <= TOOL_STACK_OVERFLOW_THRESHOLD; i++) {
      let chatCompletion = await generateChatCompletion(messages);
      console.log(
        chalk.gray(`ASSISTANT: ${JSON.stringify(chatCompletion, null, 2)}`)
      );
      messages.push({
        role: "assistant",
        content: JSON.stringify(chatCompletion),
      });

      if (typeof chatCompletion === "string") {
        errorCount++;
        const error = "output format error"
        const newMessages = await errorHandlers[error](error, messages);
        if (newMessages) {
          messages = newMessages;
          chatCompletion = await generateChatCompletion(messages);
          console.log(
            chalk.gray(`ASSISTANT: ${JSON.stringify(chatCompletion, null, 2)}`)
          );
          messages.push({
            role: "assistant",
            content: JSON.stringify(chatCompletion),
          });
          if (typeof chatCompletion === "string") {
            const content = JSON.stringify({
              error,
              msg: "After two attempts, the output format was not correct.",
            });
            console.error(chalk.red(`SYSTEM: ${content}`));
            messages.push({
              role: "system",
              content,
            });
            return { error, messages };
          }
        }
      }
      if (typeof chatCompletion === "string") {
        return { error: 'unknown', messages };
      }
      if ("error" in chatCompletion) {
        console.error(
          chalk.red(`SYSTEM: ${JSON.stringify(chatCompletion, null, 2)}`)
        );
        return { error: chatCompletion.error, messages };
      }

      if ("tool" in chatCompletion) {
        if (isValidTool(chatCompletion.tool)) { // TODO is valid tool should be generic
          const response = await Tools[chatCompletion.tool](
            chatCompletion.args
          );
          console.log(
            chalk.gray(`ASSISTANT: ${JSON.stringify(response, null, 2)}`)
          );
          messages.push({
            role: "assistant",
            content: response,
          });
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
        messages.push({
          role: "system",
          content: reflectionPromptWithZodError,
        });
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


type tests = [
]