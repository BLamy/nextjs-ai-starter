import '@/ai/prompts/preambles/tools.turbo.Prompt.txt';
import '@/ai/prompts/examples/NFLScores.Examples.json';
import { z } from 'zod';

const nflTeamSchema = z.union([
  z.literal("Cardinals"), z.literal("Falcons"), z.literal("Ravens"), z.literal("Bills"), z.literal("Panthers"), 
  z.literal("Bears"), z.literal("Bengals"), z.literal("Browns"), z.literal("Cowboys"), z.literal("Broncos"), 
  z.literal("Lions"), z.literal("Packers"), z.literal("Texans"), z.literal("Colts"), z.literal("Jaguars"), 
  z.literal("Chiefs"), z.literal("Dolphins"), z.literal("Vikings"), z.literal("Patriots"), z.literal("Saints"), 
  z.literal("Giants"), z.literal("Jets"), z.literal("Raiders"), z.literal("Eagles"), z.literal("Steelers"), 
  z.literal("Chargers"), z.literal("49ers"), z.literal("Seahawks"), z.literal("Rams"), z.literal("Buccaneers"), 
  z.literal("Titans"), z.literal("Commanders")
]);

export const inputSchema = z.object({
  teamName: nflTeamSchema
});

export const outputSchema = z.object({
  winningTeam: nflTeamSchema,
  homeTeam: nflTeamSchema,
  awayTeam: nflTeamSchema,
  homeScore: z.number(),
  awayScore: z.number(),
  spread: z.number().positive()
});

export type Prompt = "Can you tell me the results to the most recent {{teamName}} NFL game then calculate the spread.";;
export type Input = z.infer<typeof inputSchema>;
export type Output = z.infer<typeof outputSchema>;
export type Errors = "no game found" | "tool error" | "prompt injection attempt detected" | "json parse error" | "type error" | "output format error" | "unknown";
export type Tools = { tool: 'search', args: { query: string } } | { tool: 'calculator', args: { equation: string } };