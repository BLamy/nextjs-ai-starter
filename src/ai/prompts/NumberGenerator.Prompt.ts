import { z } from 'zod';

export const prompt = "Can you tell me a number between {{min}} and {{max}}?";

export const messages = [
    {"role":"user","content":"{ \"min\": 1, \"max\": 100}"},
    {"role":"assistant","content":"{ \"result\": 42}"},
    {"role":"user","content":"{ \"min\": 1, \"max\": 100}"},
    {"role":"assistant","content":"{ \"result\": 69}"},
    {"role":"user","content":"{ \"min\": 100, \"max\": 1}"},
    {"role":"assistant","content":"{ \"error\":{ \"type\": \"InvalidInput\", \"msg\": \"min must be less than max\"}}"}
] as const;

export const inputSchema = z.object({
    min: z.number().min(1).max(100),
    max: z.number().min(1).max(100),
});

export const outputSchema = z.object({
    result: z.number().min(1).max(100),
});

export type Prompt = typeof prompt;
export type Input = z.infer<typeof inputSchema>
export type Output = z.infer<typeof outputSchema>