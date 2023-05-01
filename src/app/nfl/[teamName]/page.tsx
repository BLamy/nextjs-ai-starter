import Prompts from "@/ai/prompts";
import * as PromptTypes from "@/ai/prompts";
import Chat from "@/components/Chat";
import TypesafePrompt from "@/lib/TypesafePrompt";
import { ChatCompletionRequestMessage } from "openai";

const errorHandlers = {
  "json parse error": async (error: string, messages: ChatCompletionRequestMessage[]) => {},
  "no game found": async (error: string, messages: ChatCompletionRequestMessage[]) => {},
  "output format error": async (error: string, messages: ChatCompletionRequestMessage[]) => {},
  "prompt injection attempt detected": async (error: string, messages: ChatCompletionRequestMessage[]) => {
    // ratelimiter.banUser();
  },
  "tool error": async (error: string, messages: ChatCompletionRequestMessage[]) => {},
  "type error": async (error: string, messages: ChatCompletionRequestMessage[]) => {},
  "unknown": async (error: string, messages: ChatCompletionRequestMessage[]) => {},
  "zod validation error": async (error: string, messages: ChatCompletionRequestMessage[]) => {
    return [...messages, {
      role: "system" as const,
      content: `USER: I tried to parse your output against the schema and I got this error ${error}. Did your previous response match the expected Output format? Remember no values in your response cannot be null or undefined unless they are marked with a Question Mark in the typescript type. If you believe your output is correct please repeat it. If not, please print an updated valid output or an error. Remember nothing other than valid JSON can be sent to the user
ASSISTANT: My previous response did not match the expected Output format. Here is either the updated valid output or a relevant error from the Errors union:\n` as const,
    }]
  },
};

type Props = {
  params: PromptTypes.NFLScores.Input;
}

export default async function ScorePageWithSpread({ params }: Props) {
  const prompt = new TypesafePrompt(
    Prompts.NFLScores,
    PromptTypes.NFLScores.inputSchema,
    PromptTypes.NFLScores.outputSchema,
  );

  const { messages } = await prompt.run<PromptTypes.NFLScores.Errors>(params, errorHandlers);
  return <Chat messages={messages} />;
}
