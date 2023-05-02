import { ChatCompletionRequestMessage } from "openai";
import { generateChatCompletion, user, assistant } from "@/lib/ChatCompletion";
import Chat from "@/components/organisms/Chat";
import Prompts from "@/ai/prompts";

export default async function RailExample() {
  const messages: ChatCompletionRequestMessage[] = [
    user(Prompts.BankRun),
  ];
  const res = await generateChatCompletion(messages, {
    model: "gpt-4",
  });
  return (
    <Chat
      messages={[
        ...messages,
        assistant(JSON.stringify(res, null, 2)),
      ]}
    />
  );
}
