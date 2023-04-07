// ### Examples
// USER: { "teamName": "49ers" }
// ASSISTANT: { tool: "search", args: { query: "Score to most recent 49ers NFL game" }}
// SYSTEM: ull highlights, analysis and recap of 49ers win over Seahawks in NFC wild-card game. The NFL wild-card weekend kicked off Saturday with the 49ers beating the Seahawks 41-23 in the 2 seed-7 seed matchup of the NFC playoffs. Check in with The Athletic for all the latest news, highlights, reaction and analysis.
// ASSISTANT: { tool: "calculator", args: { equation: "41-23" }}
// SYSTEM: 18
// ASSISTANT: { "winningTeam": "49ers", "homeTeam": "49ers", "awayTeam": "Seahawks", "homeScore": 41, "awayScore": 23, "spread": 18 }

// ### Typescript
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
  spread: z.number().positive() ,
});

export type Prompt = "Can you tell me the results to the most recent {{teamName}} NFL game then calculate the spread."
export type Input = z.infer<typeof inputSchema>
export type Output = z.infer<typeof outputSchema>
export type Errors = "no game found" | "tool error" | "prompt injection attempt detected" | "json parse error" | "type error" | "output format error" | "unknown"
export type Tools = { tool: 'search', args: { query: string } } | { tool: 'calculator', args: { equation: string } }