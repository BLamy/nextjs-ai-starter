import { z } from 'zod';
import { evaluate } from "mathjs";

export const inputSchema = z.object({
  equation: z.string()
});

export default function calculator({ equation }: z.infer<typeof inputSchema>) {
  return evaluate(equation);
}
