
import { z } from "zod";
import { ChatCompletionRequestMessage } from "openai";

export const prompt = "Can you tell {{count}} {{jokeType}} jokes?";

export const jokeTypeSchema = z.union([
  z.literal("funny"),
  z.literal("dumb"),
  z.literal("dad"),
]);

export const inputSchema = z.object({
  count: z.number().min(1).max(10),
  jokeType: jokeTypeSchema,
});

export const outputSchema = z.array(
  z.object({
    setup: z.string(),
    punchline: z.string(),
    // TODO this no longer works with zod-to-ts maybe I can create my own fork
    // explanation: z.custom<`This is a ${z.infer<typeof jokeTypeSchema>} joke because ${string}`>((val) => {
    //   return /This is a (funny|dad|dumb) joke because (.*)/.test(val as string);
    // }),
  })
);

export const examples = [
  { role: "user", content: JSON.stringify({ count: 3, jokeType: "funny" }) },
  {
    role: "assistant",
    content: JSON.stringify([
      {
        setup: "Why did the tomato turn red?",
        punchline: "Because it saw the salad dressing!",
        explanation:
          "This is a funny joke because of the pun in salad dressing.",
      },
      {
        setup: "Why did the scarecrow win an award?",
        punchline: "Because he was outstanding in his field.",
        explanation:
          "This is a funny joke because of the pun on the word field.",
      },
      {
        setup: "Why don't scientists trust atoms?",
        punchline: "Because they make up everything.",
        explanation:
          "This is a funny joke because atoms are the basic building block for everything and therefore there is a pun for making everything up",
      },
    ]),
  },
] as ChatCompletionRequestMessage[];


export type Prompt = typeof prompt;
export type Input = z.infer<typeof inputSchema>;
export type Output = z.infer<typeof outputSchema>;
export type Errors =
  | "prompt injection attempt detected"
  | "type validation error"
  | "output formatting"
  | "unknown";
