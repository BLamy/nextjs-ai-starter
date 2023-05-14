import { generateChatCompletion, user, assistant } from "@/lib/ChatCompletion";
import Chat from "@/components/organisms/Chat";
import { ChatCompletionRequestMessage } from "openai";
import * as Prompts from "@/ai/prompts";

export default async function Joke() {
  const messages: ChatCompletionRequestMessage[] = [
    user(Prompts.PoemGenerator),
  ];
  const res = await generateChatCompletion(messages, {
    parseResponse: false,
  });
  return <Chat messages={[...messages, assistant(res as string)]} />;
}
