import { ChatCompletionRequestMessage } from "openai";
import { generateChatCompletion } from "@/lib/ChatCompletion";
import Chat from "@/components/Chat";
import Prompts from "@/ai/prompts";

export default async function RailExample() {
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "user",
      content: Prompts.BankRun,
    },
  ];
  const res = await generateChatCompletion(messages, {
    model: "gpt-4",
  });
  return (
    <Chat
      messages={[
        ...messages,
        {
          role: "assistant",
          content: JSON.stringify(res, null, 2),
        },
      ]}
    />
  );
}
