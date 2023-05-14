import * as Prompts from "@/ai/prompts";
import Chat from "@/components/organisms/Chat";
import TypesafePrompt, { ErrorHandler } from "@/lib/TypesafePrompt";
import { ChatCompletionRequestMessage } from "openai";



type Props = {
  params: Prompts.NFLScores.Input;
};

export default async function ScorePageWithSpread({ params }: Props) {
  const prompt = new TypesafePrompt(
    Prompts.NFLScores.prompt,
    Prompts.NFLScores.inputSchema,
    Prompts.NFLScores.outputSchema
  );

  const { messages } = await prompt.run<Prompts.NFLScores.Errors>(
    params,
    Prompts.NFLScores.errorHandlers
  );
  return <Chat messages={messages} />;
}
