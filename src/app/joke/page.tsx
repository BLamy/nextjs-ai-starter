import * as Prompts from "@/ai/prompts";
import { generateChatCompletion } from "@/lib/ChatCompletion";
import { ChatCompletionRequestMessage } from "openai";
import chalk from "chalk";

async function runJokeGenerationPrompt(
    args: Prompts.JokeGenerator.Input
  ): Promise<Prompts.JokeGenerator.Output> {
    console.log(chalk.blue(`SYSTEM: ${process.env.JokeGeneratorPrompt}`));
    console.log(chalk.green(`USER: ${JSON.stringify(args)}`));
    let messages: ChatCompletionRequestMessage[] = [
      {
        role: "system",
        content: process.env.JokeGeneratorPrompt as string,
      },
      {
        role: "user",
        content: JSON.stringify(args),
      },
    ];
    const chatCompletion = await generateChatCompletion(messages);
    console.log(chalk.gray(`ASSISTANT: ${JSON.stringify(chatCompletion)}`));
    messages.push({
        role: "assistant",
        content: JSON.stringify(chatCompletion),
    });

    if (chatCompletion.error) {
        const err = `ERROR: ${JSON.stringify(chatCompletion.error)}. ${JSON.stringify(messages)}`;
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
  
  export default async function Joke({
    // params,
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
    const args = Prompts.JokeGenerator.inputSchema.safeParse(params);
    if (!args.success) {
      return <h1>400 - invalid arguments</h1>;
    }
    const res = await runJokeGenerationPrompt(args.data);
    return (
      <div>
        <h1>Tell me {params.count} {params.jokeType} Jokes:</h1>
        {JSON.stringify(res)}
      </div>
    );
  }
  