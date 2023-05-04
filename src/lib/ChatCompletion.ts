import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);
type Error = {
  error: string;
  msg: string;
};
type Options = {
  model?: string; //"gpt-3.5-turbo" | "gpt-4"
  parseResponse?: boolean;
  temperature?: number;
};
const defaultOpts = {
  parseResponse: true,
  model: "gpt-3.5-turbo",
  temperature: 0,
};
export async function generateChatCompletion<
  TOutput extends Record<string, any>
>(
  messages: ChatCompletionRequestMessage[],
  opts: Options = {}
): Promise<TOutput | string | Error> {
  const { parseResponse, model, temperature } = { ...defaultOpts, ...opts };
  const response = await openai.createChatCompletion({
    model,
    messages,
    temperature,
  });

  try {
    if (!parseResponse)
      return (
        response.data.choices[0].message?.content ||
        '{ "error": "No response" }'
      );
    return JSON.parse(
      response.data.choices[0].message?.content.replace(
        "Here's your response:",
        ""
      ) || '{ "error": "No response" }'
    );
  } catch (e) {
    return {
      error: "json parse error",
      msg:
        response.data.choices[0].message?.content ||
        '{ "error": "No response" }',
    };
  }
}

// ChatMessage creation helpers
// Ideally these would have been tagged template literals but typescript support for it is not great
// https://github.com/microsoft/TypeScript/issues/33304
export function system<const T extends string, S = T>(content: TemplateStringsArray | T) {
  return { role: "system" as const, content };
}

export function user<const T extends string, S = T>(content: TemplateStringsArray | T) {
  return { role: "user" as const, content };
}

export function assistant<const T extends string, S = T>(content: TemplateStringsArray | T) {
  return { role: "assistant" as const, content };
}
