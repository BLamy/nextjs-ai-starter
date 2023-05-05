import { exec } from "child_process";

export const tsxCodeBlockRegex = /```(?:tsx)?(.*)```/s;
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
  const indentLengths = strings.reduce((arr, str) => {
    const matches = str.match(/\n([\t ]+|(?!\s).)/g);
    if (matches) {
      return arr.concat(
        matches.map((match) => match.match(/[\t ]/g)?.length ?? 0)
      );
    }
    return arr;
  }, <number[]>[]);

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
