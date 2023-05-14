import { z } from 'zod';
import { ChatCompletionRequestMessage } from 'openai';
import { search, calculator } from '../tools';
import { evaluate } from "mathjs";

export const prompt = "Can you tell me the results to the most recent {{teamName}} NFL game then calculate the spread.";

export const examples = [
  {"role":"user","content":"{ \"teamName\": \"49ers\"}"},
  {"role":"assistant","content":"{ \"tool\": \"search\", \"args\":{ \"query\": \"Score to most recent 49ers NFL game\"}}"},
  {"role":"system","content":"ull highlights, analysis and recap of 49ers win over Seahawks in NFC wild-card game. The NFL wild-card weekend kicked off Saturday with the 49ers beating the Seahawks 41-23 in the 2 seed-7 seed matchup of the NFC playoffs. Check in with The Athletic for all the latest news, highlights, reaction and analysis."},
  {"role":"assistant","content":"{ \"tool\": \"calculator\", \"args\": {\"equation\": \"41-23\"}}"},
  {"role":"system","content":"18"},
  {"role":"assistant","content":"{ \"winningTeam\": \"49ers\", \"homeTeam\": \"49ers\",\"awayTeam\": \"Seahawks\",\"homeScore\": 41,\"awayScore\": 23,\"spread\": 18}"}
] as const;

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

export const errorHandlers = {
  "json parse error": async (
    error: string,
    messages: ChatCompletionRequestMessage[]
  ) => {},
  "no game found": async (
    error: string,
    messages: ChatCompletionRequestMessage[]
  ) => {},
  "output format error": async (
    error: string,
    messages: ChatCompletionRequestMessage[]
  ) => {},
  "prompt injection attempt detected": async (
    error: string,
    messages: ChatCompletionRequestMessage[]
  ) => {
    // ratelimiter.banUser();
  },
  "tool error": async (
    error: string,
    messages: ChatCompletionRequestMessage[]
  ) => {},
  "type error": async (
    error: string,
    messages: ChatCompletionRequestMessage[]
  ) => {},
  unknown: async (
    error: string,
    messages: ChatCompletionRequestMessage[]
  ) => {},
  "type validation error": async (
    error: string,
    messages: ChatCompletionRequestMessage[]
  ) => {
    return [
      ...messages,
      {
        role: "system" as const,
        content:
          `USER: I tried to parse your output against the schema and I got this error ${error}. Did your previous response match the expected Output format? Remember no values in your response cannot be null or undefined unless they are marked with a Question Mark in the typescript type. If you believe your output is correct please repeat it. If not, please print an updated valid output or an error. Remember nothing other than valid JSON can be sent to the user
ASSISTANT: My previous response did not match the expected Output format. Here is either the updated valid output or a relevant error from the Errors union:\n` as const,
      },
    ];
  },
};

export const tools = { search, calculator }
