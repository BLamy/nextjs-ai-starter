import * as Prompts from "@/ai/prompts";
import { generateChatCompletion } from "@/lib/ChatCompletion";
import { ChatCompletionRequestMessage } from "openai";
import chalk from "chalk";
import CodeCollapsible from "@/components/CodeCollapsible";

const systemPrompt = process.env.JokeGeneratorPrompt as string;

async function runJokeGenerationPrompt(
    input: Prompts.JokeGenerator.Input
  ): Promise<Prompts.JokeGenerator.Output> {
    console.log(chalk.blue(`SYSTEM: ${systemPrompt}`));
    console.log(chalk.green(`USER: ${JSON.stringify(input)}`));
    let messages: ChatCompletionRequestMessage[] = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: JSON.stringify(input),
      },
    ];
    const chatCompletion = await generateChatCompletion(messages);
    console.log(chalk.gray(`ASSISTANT: ${JSON.stringify(chatCompletion)}`));
    messages.push({
        role: "assistant",
        content: JSON.stringify(chatCompletion),
    });

    if (typeof chatCompletion === 'string' || chatCompletion.error) {
        const err = `ERROR: ${JSON.stringify(chatCompletion)}. ${JSON.stringify(messages)}`;
        console.error(chalk.red(err));
        throw new Error(err);
    }

    console.log(chatCompletion)
    const response = Prompts.JokeGenerator.outputSchema.safeParse(chatCompletion);
    if (response.success) {
    return response.data;
    }
    const err = `ERROR: Could not produce ouput in specified format. ${JSON.stringify(messages)}`;
    console.error(chalk.red(err));
    throw new Error(err);
  };
  // Force dynamic is required to use URLSearchParams otherwise it will
  // cache the default values and serve them every time in prod
  export const dynamic = 'force-dynamic'
  export default async function Joke({
    searchParams,
  }: {
    searchParams: URLSearchParams;
  }) {
    const params: Prompts.JokeGenerator.Input = {
      count: 1,
      jokeType: "funny",
    }
    if ("count" in searchParams) {
      params.count = parseInt(searchParams.count as string);
    }
    if ("jokeType" in searchParams && (searchParams.jokeType === "dad" || searchParams.jokeType === "funny" || searchParams.jokeType === "dumb")) {
      params.jokeType = searchParams.jokeType;
    }
    const input = Prompts.JokeGenerator.inputSchema.safeParse(params);
    if (!input.success) {
      return <h1>400 - invalid arguments</h1>;
    }
    const res = await runJokeGenerationPrompt(input.data);
    return (
      <div className="m-10">
        <CodeCollapsible title="System" color="blue" code={systemPrompt} />
        <CodeCollapsible title="User" color="green" code={JSON.stringify(input.data, null, 2)} />
        <CodeCollapsible title="Assistant" color="gray" isOpenByDefault code={JSON.stringify(res, null, 2)} />
      </div>
    );
  }
  