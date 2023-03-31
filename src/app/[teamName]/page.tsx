import * as Prompts from "@/ai/prompts";
import * as Tools from "@/ai/tools";
import chalk from "chalk";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateChatCompletion = async (
  messages: ChatCompletionRequestMessage[]
): Promise<Record<string, any>> => {
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages,
  });

  return JSON.parse(
    response.data.choices[0].message?.content || '{ "error": "No response" }'
  );
};

const isValidTool = (tool: string): tool is "search" | "calculator" => {
  return tool === "search" || tool === "calculator";
};

const runNFLScoresPrompt = async (
  args: Prompts.NFLScores.Input
): Promise<Prompts.NFLScores.Output> => {
  console.log(chalk.blue(`SYSTEM: ${process.env.NFLScoresPrompt}`));
  console.log(chalk.green(`USER: ${JSON.stringify(args)}`));
  let messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: process.env.NFLScoresPrompt as string,
    },
    {
      role: "user",
      content: JSON.stringify(args),
    },
  ];
  // There are only two tools so if it loops more than twice, something is wrong.
  const TOOL_STACK_OVERFLOW_THRESHOLD = 2;
  for (let i = 0; i <= TOOL_STACK_OVERFLOW_THRESHOLD; i++) {
    const chatCompletion = await generateChatCompletion(messages);
    console.log(chalk.gray(`ASSISTANT: ${JSON.stringify(chatCompletion)}`));
    messages.push({
      role: "assistant",
      content: JSON.stringify(chatCompletion),
    });

    if (chatCompletion.error) {
      const errMsg = JSON.stringify(chatCompletion.error);
      const err = `ERROR: ${errMsg}. ${JSON.stringify(messages)}`;
      console.error(chalk.red(err));
      throw new Error(err);
    }

    if (chatCompletion.tool) {
      if (isValidTool(chatCompletion.tool)) {
        const response = await Tools[chatCompletion.tool](chatCompletion.args);
        const toolResponse = JSON.stringify(response);
        console.log(chalk.blue(`SYSTEM: ${toolResponse}`));
        messages.push({
          role: "system",
          content: toolResponse,
        });
      } else {
        const msgLog = JSON.stringify(messages);
        const err = `HALLUCINATION: Unknown tool. ${msgLog}`;
        console.error(chalk.red(err));
        throw new Error(err);
      }
    } else {
      const response = Prompts.NFLScores.outputSchema.safeParse(chatCompletion);
      if (response.success) {
        return response.data;
      }
    }
  }
  const msgLog = JSON.stringify(messages);
  const err = `STACK OVERFLOW: Too many tools used. ${msgLog}`;
  console.error(chalk.red(err));
  throw new Error(err);
};

export default async function ScorePageWithSpread({
  params,
}: {
  params: Prompts.NFLScores.Input;
}) {
  const args = Prompts.NFLScores.inputSchema.safeParse(params);
  if (!args.success) {
    return <h1>404 - Team Not found</h1>;
  }
  const res = await runNFLScoresPrompt(args.data);
  return (
    <div>
      <h1>Last {params.teamName} Game:</h1>
      {JSON.stringify(res)}
    </div>
  );
}
