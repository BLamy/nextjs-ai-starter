import React from "react";
import Prompts from "@/ai/prompts";
import * as PromptTypes from "@/ai/prompts";
import { ChatCompletionRequestMessage } from "openai";
import Chat from "@/components/organisms/Chat";
import TypesafePrompt from "@/lib/TypesafePrompt";

// Search params are passed in from the URL are always strings
type Props = {
  searchParams: {
    [key in keyof PromptTypes.JokeGenerator.Input]: string;
  }
};

// This is a map of error types to error handlers
// The error handlers are async functions that take in the error string and the messages
// You can return a new set of messages which will be used in the chat as an attempt to fix the error
// If you return nothing the chat will terminate and the error will be displayed to the user
const errorHandlers = {
  "unknown": async (error: string, messages: ChatCompletionRequestMessage[]) => {},
  "prompt injection attempt detected": async (error: string, messages: ChatCompletionRequestMessage[]) => {},
  "json parse error": async (error: string, messages: ChatCompletionRequestMessage[]) => {},
  "zod validation error": async (error: string, messages: ChatCompletionRequestMessage[]) => {
    console.log(error, messages);
  },
  "output formatting": async (error: string, messages: ChatCompletionRequestMessage[]) => {},
};

// Force dynamic is required to use URLSearchParams otherwise it will
// cache the default values and serve them every time in prod
// Might be better to just allow a next argument to be fed to generateChatCompletion
export const dynamic = "force-dynamic";
export default async function Joke({ searchParams }: Props) {
  const prompt = new TypesafePrompt(
    Prompts.JokeGenerator,
    PromptTypes.JokeGenerator.inputSchema,
    PromptTypes.JokeGenerator.outputSchema
  );
  const params = {
    count: Number.parseInt(searchParams["count"] || "1"),
    jokeType: PromptTypes.JokeGenerator.jokeTypeSchema.parse(searchParams["jokeType"]),
  }
  const { messages } = await prompt.run<PromptTypes.JokeGenerator.Errors>(params, errorHandlers);
  return <Chat messages={messages} />;
}
