import { generateChatCompletion } from "@/lib/ChatCompletion";
import Chat from "@/components/organisms/Chat";
import { ChatCompletionRequestMessage } from "openai";
import Prompts from "@/ai/prompts";

export default async function Joke() {
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "user",
      content: Prompts.PoemGenerator,
    },
  ];
  const res = await generateChatCompletion(messages, {
    parseResponse: false,
  });
  return (
    <Chat
      messages={[
        ...messages,
        {
          role: "assistant",
          content: res as string,
        },
      ]}
    />
  );
}
