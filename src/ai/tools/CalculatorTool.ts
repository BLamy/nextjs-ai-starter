import { evaluate } from "mathjs";

export default function calculator({ equation }: { equation: string }) {
  return evaluate(equation);
}
