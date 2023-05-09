import { exec } from "child_process";
import * as https from 'https';
import { IncomingHttpHeaders } from "http";

export const tsxCodeBlockRegex = /```(?:tsx)?(.*)```/s;
export const gptCodeBlockRegex = /```(gpt3|gpt4|gpt-3\.5-turbo|gpt-4)?(.*)```/s;
export const exportDefaultRegex = /export\s+default\s+([\w]+)/s;
export const exportDefaultFunctionRegex = /export\s+default\s+function\s+([\w]+)/s;

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
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  gray: "\x1b[90m",
};
export function colorLog(color: keyof typeof colors, text: string): void {
  console.log(color + text + colors.reset);
}
export function runCommand(command: string) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error executing command: ${error.message}`));
        return;
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }

      resolve(stdout);
    });
  });
}

interface RequestOptions {
  method?: string;
  body?: string;
  headers?: IncomingHttpHeaders;
}

interface SimpleResponse {
  json: () => Promise<any>;
  status: number;
  headers: IncomingHttpHeaders;
}

export function simpleFetch(url: string, options: RequestOptions = {}): Promise<SimpleResponse> {
  return new Promise((resolve, reject) => {
    const { 
      method = 'GET', 
      body, 
      headers = {
        'Content-Type': 'application/json',
      } 
    } = options;

    const requestOptions: https.RequestOptions = {
      method,
      headers,
    };

    if (body) {
      // @ts-ignore
      requestOptions.headers['Content-Length'] = Buffer.byteLength(body);
    }

    const request = https.request(url, requestOptions, (response) => {
      let responseData = '';

      // A chunk of data has been received.
      response.on('data', (chunk: string) => {
        responseData += chunk;
      });

      // The whole response has been received.
      response.on('end', () => {
        resolve({
          json: () => Promise.resolve({ data: JSON.parse(responseData)}),
          status: response.statusCode as number,
          headers: response.headers,
        });
      });
    });

    request.on('error', (error: Error) => {
      reject(error);
    });

    if (body) {
      request.write(body);
    }

    request.end();
  });
}