import * as Prompts from "@/ai/prompts";
import * as Tools from "@/ai/tools";
import { Errors as NFLScoresErrors } from "@/ai/prompts/NFLScores.Prompt";
import chalk from "chalk";
import { generateChatCompletion } from "@/lib/ChatCompletion";
import { ChatCompletionRequestMessage } from "openai";
import CodeCollapsible from "@/components/CodeCollapsible";
import { colorForRole, isValidTool } from "@/lib/Utils";

type ErrorWithMessages = { error: NFLScoresErrors, messages: ChatCompletionRequestMessage[] }
// TODO move this prompt to the prompt file
const createReflectionPromptForError = (error: string) =>  `USER: I tried to parse your output against the schema and I got this error ${error}. Did your previous response match the expected Output format? Remember no values in your response cannot be null or undefined unless they are marked with a Question Mark in the typescript type. If you believe your output is correct please repeat it. If not, please print an updated valid output or an error. Remember nothing other than valid JSON can be sent to the user
ASSISTANT: My previous response did not match the expected Output format. Here is either the updated valid output or a relevant error from the Errors union:\n`

// TODO: turn this into a generic function and rename to chain.run
async function runNFLScoresPrompt(
  input: Prompts.NFLScores.Input
): Promise<{ res: Prompts.NFLScores.Output, messages: ChatCompletionRequestMessage[] } | ErrorWithMessages> {
  console.log(chalk.blue(`SYSTEM: ${process.env.NFLScoresPrompt}`));
  console.log(chalk.green(`USER: ${JSON.stringify(input, null, 2)}`));
  let messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: process.env.NFLScoresPrompt as string,
    },
    {
      role: "user",
      content: JSON.stringify(input),
    },
  ];
  // There are only two tools so if it loops more than twice, something is wrong.
  const TOOL_STACK_OVERFLOW_THRESHOLD = 5;
  for (let i = 0; i <= TOOL_STACK_OVERFLOW_THRESHOLD; i++) {
    let chatCompletion = await generateChatCompletion(messages);
    console.log(chalk.gray(`ASSISTANT: ${JSON.stringify(chatCompletion, null, 2)}`));
    messages.push({
      role: "assistant",
      content: JSON.stringify(chatCompletion),
    });

    if (typeof chatCompletion === "string") {
      const reflectionPrompt = createReflectionPromptForError("output was not a JSON object. Recieved string.");
      console.log(chalk.gray(`SYSTEM: ${reflectionPrompt}`));
      messages.push({
        role: "system",
        content: reflectionPrompt,
      });
      chatCompletion = await generateChatCompletion(messages);
      console.log(chalk.gray(`ASSISTANT: ${JSON.stringify(chatCompletion, null, 2)}`));
      messages.push({
        role: "assistant",
        content: JSON.stringify(chatCompletion),
      });
      if (typeof chatCompletion === "string") {
        const error = "output format error";
        const content = JSON.stringify({ error, msg: "After two attempts, the output format was not correct."});
        console.error(chalk.red(`SYSTEM: ${content}`));
        messages.push({
          role: "system",
          content,
        });
        return { error, messages };
      }
    }

    if ("error" in chatCompletion) {
      console.error(chalk.red(`SYSTEM: ${JSON.stringify(chatCompletion.error)}`));
      return { error: chatCompletion.error, messages }
    }

    if ("tool" in chatCompletion) {
      if (isValidTool(chatCompletion.tool)) {
        const response = await Tools[chatCompletion.tool](chatCompletion.args);
        console.log(chalk.green(`ASSISTANT: ${JSON.stringify(response, null, 2)}`));
        messages.push({
          role: "assistant",
          content: response,
        });
      } else {
        const err = `HALLUCINATION: Unknown tool. ${JSON.stringify(messages, null, 2)}`;
        console.error(chalk.red(`SYSTEM: ${err}`));
        return { error: chatCompletion.error, messages }
      }
    } else {
      let response = Prompts.NFLScores.outputSchema.safeParse(chatCompletion);
      if (response.success) {
        return { res: response.data, messages };
      }
      const reflectionPromptWithZodError = createReflectionPromptForError(response.error.message);
      messages.push({
        role: "system",
        content: reflectionPromptWithZodError,
      });
      console.log(chalk.gray(`SYSTEM: ${reflectionPromptWithZodError}`));
    }
  }
  const err = `STACK OVERFLOW: Too many tools used. ${JSON.stringify(messages)}`;
  console.error(chalk.red(`SYSTEM: ${err}`));
  return { error: "unknown", messages }
};


export default async function ScorePageWithSpread({
  params,
}: {
  params: Prompts.NFLScores.Input;
}) {
  const input = Prompts.NFLScores.inputSchema.safeParse(params);
  if (!input.success) {
    return <h1>404 - Team Not found</h1>;
  }
  const { messages } = await runNFLScoresPrompt(input.data);
  return (
    <div className="m-10">
      <h1>Last {params.teamName} Game:</h1>
      {messages.map((message, i) => (
        <CodeCollapsible
          key={i}
          title={message.role}
          code={message.content}
          color={i > 0 && message.content.includes('"error":') ? "red" : colorForRole(message.role)}
        />
      ))}
    </div>
  );
}
