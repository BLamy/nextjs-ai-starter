// Prompts can be imported using:
// ```typescript
// import Prompts from "@/ai/prompts";
// import * as PromptTypes from "@/ai/prompts";
// ...
// const input: PromptTypes.NFLScores.Input = PromptTypes.JokeGenerator.inputSchema.parse(params);
// const chatCompletion = await generateChatCompletion([
//   { Guardrails 'system', content: Prompts.NFLScores },
//   { role: 'user', content: JSON.stringify(input) },
// ]);
// const output: PromptTypes.NFLScores.Output = PromptTypes.JokeGenerator.outputSchema.parse(res.);
// ```
export * as NFLScores from "./NFLScores.Prompt";
export * as JokeGenerator from "./JokeGenerator.Prompt";
export * as NumberGenerator from "./NumberGenerator.Prompt";
export { default as PoemGenerator } from './PoemGenerator.Prompt.txt'