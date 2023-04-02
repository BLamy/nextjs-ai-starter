import * as Prompts from "@/ai/prompts";
import * as Tools from "@/ai/tools";
import chalk from "chalk";
import { generateChatCompletion } from "@/lib/ChatCompletion";
import { ChatCompletionRequestMessage } from "openai";
import CodeCollapsible from "@/components/CodeCollapsible";
import { colorForRole, isValidTool } from "@/lib/Utils";

async function runNFLScoresPrompt(
  input: Prompts.NFLScores.Input
): Promise<{ res: Prompts.NFLScores.Output, messages: ChatCompletionRequestMessage[] }> {
  console.log(chalk.blue(`SYSTEM: ${process.env.NFLScoresPrompt}`));
  console.log(chalk.green(`USER: ${JSON.stringify(input, null, 2)}`));
  let messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: process.env.NFLScoresPrompt as string,
    },
    {
      role: "user",
      content: JSON.stringify(input, null, 2),
    },
  ];
  // There are only two tools so if it loops more than twice, something is wrong.
  const TOOL_STACK_OVERFLOW_THRESHOLD = 3;
  for (let i = 0; i <= TOOL_STACK_OVERFLOW_THRESHOLD; i++) {
    const chatCompletion = await generateChatCompletion(messages);
    console.log(chalk.gray(`ASSISTANT: ${JSON.stringify(chatCompletion, null, 2)}`));
    messages.push({
      role: "assistant",
      content: JSON.stringify(chatCompletion, null, 2),
    });

    if (typeof chatCompletion === "string" || chatCompletion.error) {
      const err = `ERROR: ${JSON.stringify(chatCompletion)}. ${JSON.stringify(messages, null, 2)}`;
      console.error(chalk.red(err));
      throw new Error(err);
    }

    if (chatCompletion.tool) {
      if (isValidTool(chatCompletion.tool)) {
        const response = await Tools[chatCompletion.tool](chatCompletion.req);
        const toolResponse = JSON.stringify(response, null, 2);
        console.log(chalk.blue(`SYSTEM: ${toolResponse}`));
        messages.push({
          role: "system",
          content: toolResponse,
        });
      } else {
        const err = `HALLUCINATION: Unknown tool. ${JSON.stringify(messages, null, 2)}`;
        console.error(chalk.red(err));
        throw new Error(err);
      }
    } else {
      const response = Prompts.NFLScores.outputSchema.safeParse(chatCompletion);
      if (response.success) {
        return { res: response.data, messages };
      }
    }
  }
  const err = `STACK OVERFLOW: Too many tools used. ${JSON.stringify(messages)}`;
  console.error(chalk.red(err));
  throw new Error(err);
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
  const { res, messages } = await runNFLScoresPrompt(input.data);
  return (
    <div className="m-10">
      <h1>Last {params.teamName} Game:</h1>
      {messages.map((message, i) => (
        <CodeCollapsible
          key={i}
          title={message.role}
          code={message.content}
          color={colorForRole(message.role)}
        />
      ))}
    </div>
  );
}
