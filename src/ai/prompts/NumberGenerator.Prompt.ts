import '@/ai/prompts/preambles/basic.turbo.Prompt.txt';
import '@/ai/prompts/examples/NumberGenerator.Examples.json';

export type Prompt = "Can you tell me a number between {{min}} and {{max}}?"
export type Input = { min: number, max: number }
export type Output = { result: number }