require('@/ai/prompts/preambles/basic.turbo.Prompt.ts');
require('@/ai/prompts/examples/NumberGenerator.Examples.json');

export type Prompt = "Can you tell me a number between {{min}} and {{max}}?"
export type Input = { min: number, max: number }
export type Output = { result: number }