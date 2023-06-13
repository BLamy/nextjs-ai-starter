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
  model?: string; //"gpt-3.5-turbo-0613" | "gpt-4"
  parseResponse?: boolean;
  temperature?: number;
};
const defaultOpts = {
  parseResponse: true,
  model: "gpt-3.5-turbo-0613",
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
// Ideally these would Dedent their content, but ts is checker is way too slow
// https://tinyurl.com/message-creators-literal-types 
export function system<T extends string>(
  literals: TemplateStringsArray | T,
  ...placeholders: unknown[]
) {
  return {
    role: "system" as const,
    content: dedent(literals, ...placeholders),
  };
}
export function user<T extends string>(
  literals: TemplateStringsArray | T,
  ...placeholders: unknown[]
) {
  return {
    role: "user" as const,
    content: dedent(literals, ...placeholders),
  };
}
export function assistant<T extends string>(
  literals: TemplateStringsArray | T,
  ...placeholders: unknown[]
) {
  return {
    role: "assistant" as const,
    content: dedent(literals, ...placeholders),
  };
}

export function dedent<T extends string>(
  templ: TemplateStringsArray | T,
  ...values: unknown[]
): typeof templ extends TemplateStringsArray ? string : T {
  let strings = Array.from(typeof templ === "string" ? [templ] : templ);

  // 1. Remove trailing whitespace.
  strings[strings.length - 1] = strings[strings.length - 1].replace(
    /\r?\n([\t ]*)$/,
    ""
  );

  // 2. Find all line breaks to determine the highest common indentation level.
  const indentLengths = strings.reduce<number[]>((arr, str) => {
    const matches = str.match(/\n([\t ]+|(?!\s).)/g);
    if (matches) {
      return arr.concat(
        matches.map((match) => match.match(/[\t ]/g)?.length ?? 0)
      );
    }
    return arr;
  }, []);

  // 3. Remove the common indentation from all strings.
  if (indentLengths.length) {
    const pattern = new RegExp(`\n[\t ]{${Math.min(...indentLengths)}}`, "g");

    strings = strings.map((str) => str.replace(pattern, "\n"));
  }

  // 4. Remove leading whitespace.
  strings[0] = strings[0].replace(/^\r?\n/, "");

  // 5. Perform interpolation.
  let string = strings[0];

  values.forEach((value, i) => {
    // 5.1 Read current indentation level
    const endentations = string.match(/(?:^|\n)( *)$/);
    const endentation = endentations ? endentations[1] : "";
    let indentedValue = value;
    // 5.2 Add indentation to values with multiline strings
    if (typeof value === "string" && value.includes("\n")) {
      indentedValue = String(value)
        .split("\n")
        .map((str, i) => {
          return i === 0 ? str : `${endentation}${str}`;
        })
        .join("\n");
    }

    string += indentedValue + strings[i + 1];
  });

  return string as any;
}