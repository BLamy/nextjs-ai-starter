import React from "react";
import * as Prompts from "@/ai/prompts";
import { generateChatCompletion } from "@/lib/ChatCompletion";
import { ChatCompletionRequestMessage } from "openai";
import chalk from "chalk";
import Chat from "@/components/Chat";

type Result<TOutput, TError> = ({ res: TOutput } | { error: TError }) & {
  messages: ChatCompletionRequestMessage[];
};

const systemPrompt = process.env.JokeGeneratorPrompt as string;

async function runJokeGenerationPrompt(
  input: Prompts.JokeGenerator.Input
): Promise<Result<Prompts.JokeGenerator.Output, Prompts.JokeGenerator.Errors>> {
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

  if (typeof chatCompletion === "string" || chatCompletion.error) {
    const err = `ERROR: ${JSON.stringify(chatCompletion)}. ${JSON.stringify(
      messages
    )}`;
    console.log(chalk.red(`SYSTEM: ${err}`));
    messages.push({
      role: "system",
      content: JSON.stringify({ error: err }),
    });
    return { error: "output formatting", messages };
  }

  console.log(chatCompletion);
  const response = Prompts.JokeGenerator.outputSchema.safeParse(chatCompletion);
  if (response.success) {
    return { res: response.data, messages };
  }
  const err = `ERROR: Could not produce ouput in specified format. ${JSON.stringify(
    messages
  )}`;
  console.log(chalk.red(`SYSTEM: ${err}`));
  messages.push({
    role: "system",
    content: JSON.stringify({ error: err }),
  });
  return { error: "output formatting", messages };
}
// Force dynamic is required to use URLSearchParams otherwise it will
// cache the default values and serve them every time in prod
// Might be better to just allow a next argument to be fed to generateChatCompletion
export const dynamic = "force-dynamic";
export default async function Joke({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  // Set params
  const params: Prompts.JokeGenerator.Input = {
    count: 1,
    jokeType: "funny",
  };
  if ("count" in searchParams) {
    params.count = parseInt(searchParams.count as string);
  }
  if (
    "jokeType" in searchParams &&
    (searchParams.jokeType === "dad" ||
      searchParams.jokeType === "funny" ||
      searchParams.jokeType === "dumb")
  ) {
    params.jokeType = searchParams.jokeType;
  }

  // Run prompt
  const input = Prompts.JokeGenerator.inputSchema.safeParse(params);
  if (!input.success) {
    return <h1>400 - invalid arguments</h1>;
  }
  const { messages } = await runJokeGenerationPrompt(input.data);
  return <Chat messages={messages} />;
}
