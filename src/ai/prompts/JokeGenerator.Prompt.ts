// import '@/ai/prompts/preambles/basic.turbo.Prompt.txt';
// import '@/ai/prompts/examples/JokeGenerator.Examples.json';
import { z } from 'zod';

export const prompt = "Can you tell {{count}} {{jokeType}} jokes?"

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
      // explanation: z.custom<`This is a ${z.infer<typeof jokeTypeSchema>} joke because ${string}`>((val) => {
      //   return /This is a (funny|dad|dumb) joke because (.*)/.test(val as string);
      // }),
    })
)

export type Prompt = typeof prompt;
export type Input = z.infer<typeof inputSchema>
export type Output = z.infer<typeof outputSchema>
export type Errors = "prompt injection attempt detected" | "type validation error" | "output formatting" | "unknown"
