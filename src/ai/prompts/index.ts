import { z } from "zod";

// Prompts can be imported using:
// ```typescript
// import Prompts from "@/ai/prompts";
// import * as PromptTypes from "@/ai/prompts";
// ...
// const input: PromptTypes.NFLScores.Input = PromptTypes.JokeGenerator.inputSchema.parse(params);
// const chatCompletion = await generateChatCompletion([
//   { role: 'system', content: Prompts.NFLScores },
//   { role: 'user', content: JSON.stringify(input) },
// ]);
// const output: PromptTypes.NFLScores.Output = PromptTypes.JokeGenerator.outputSchema.parse(res.);
// ```
export * as NFLScores from "./NFLScores.Prompt";
export * as JokeGenerator from "./JokeGenerator.Prompt";
export * as NumberGenerator from "./NumberGenerator.Prompt";

// This is a zod schema that validates the environment variables
export const EnvSchema = z.object({
    NFLScores: z.string(),
    JokeGenerator: z.string(),
    NumberGenerator: z.string(),
    BankRun: z.string(),
    PoemGenerator: z.string(),
});

// This gives the default export auto-completion for the prompts
export default EnvSchema.parse({
    // Note these variables do not actually exist in the environment
    // They are replaced at build time by the DefinePlugin
    NFLScores: process.env.NFLScoresPrompt,
    JokeGenerator: process.env.JokeGeneratorPrompt,
    NumberGenerator: process.env.NumberGeneratorPrompt,
    BankRun: process.env.BankRunPrompt,
    PoemGenerator: process.env.PoemGeneratorPrompt,
});