import { generateChatCompletion } from "@/lib/ChatCompletion";
import Chat from "@/components/Chat";
import { ChatCompletionRequestMessage } from "openai";

export default async function Joke() {
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "user",
      content: process.env.PoemGeneratorPrompt as string,
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
