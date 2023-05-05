import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
import { promises as fs } from "fs";
import chalk from "chalk";
import { exec } from "child_process";

import dedent from "ts-dedent";
function system(
  literals: TemplateStringsArray | string,
  ...placeholders: unknown[]
) {
  return {
    role: "system" as const,
    content: dedent(literals, ...placeholders),
  };
}
function user(
  literals: TemplateStringsArray | string,
  ...placeholders: unknown[]
) {
  return {
    role: "user" as const,
    content: dedent(literals, ...placeholders),
  };
}
function assistant(
  literals: TemplateStringsArray | string,
  ...placeholders: unknown[]
) {
  return {
    role: "assistant" as const,
    content: dedent(literals, ...placeholders),
  };
}

const tsxCodeBlockRegex = /```(?:tsx)?(.*)```/s;
const envSchema = z.object({
  LLM_MODEL: z.union([z.literal("gpt-3.5-turbo"), z.literal("gpt-4")]),
  GH_REPO_NAME: z.string(),
  GH_ORG_NAME: z.string(),
  OPENAI_API_KEY: z.string(),
  ISSUE_BODY: z.string(),
});

export function runCommand(command) {
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

async function updateAtomComponent(input) {
  const { GH_REPO_NAME, GH_ORG_NAME, ISSUE_BODY, OPENAI_API_KEY, LLM_MODEL } =
    envSchema.parse(input);
  const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_API_KEY }));

  console.log(
    `Creating component for ${GH_ORG_NAME}/${GH_REPO_NAME} with description ${ISSUE_BODY}`
  );
  const systemPrompt = system`
      You are a react component generator I will feed you a markdown file that contains a component description.
      Your job is to create a nextjs component using tailwind and typescript.
      Please include a default export. Do not add any additional libraries or dependencies. 
      Your response should only have 1 tsx code block which is the implementation of the component. No other text should be included.
      Remember to export the component & types like this:
      export default ComponentName
      export { ComponentNameProps }
    `;

  console.log(chalk.green(`SYSTEM: ${systemPrompt.content}`));
  console.log(chalk.gray(`USER: ${ISSUE_BODY}`));

  const generateComponentResponse = await openai.createChatCompletion({
    model: LLM_MODEL,
    messages: [systemPrompt, user(ISSUE_BODY)],
  });

  const rawComponentResponse =
    generateComponentResponse.data.choices[0].message?.content;
  // grab the text inside the code block
  const exportDefaultRegex = /export\s+default\s+([\w]+)/s;
  let componentName = rawComponentResponse.match(exportDefaultRegex)?.[1];
  if (componentName === "function") {
    // if the component name is function then we need to grab the next word
    const exportDefaultFunctionRegex = /export\s+default\s+function\s+([\w]+)/s;
    componentName = rawComponentResponse.match(exportDefaultFunctionRegex)?.[1];
  }
  let codeBlock = rawComponentResponse.match(tsxCodeBlockRegex)?.[1];
  if (
    codeBlock.includes(`export { ${componentName}Props }`) &&
    codeBlock.includes(`export type ${componentName}Props`)
  ) {
    // If the props are exported twice then remove the second export
    codeBlock = codeBlock.replace(`export { ${componentName}Props }`, "");
  }
  console.log(chalk.blue(`ASSISTANT: ${codeBlock}`));
  await fs.writeFile(
    `./src/components/atoms/${componentName}.tsx`,
    codeBlock,
    "utf8"
  );
  await runCommand(
    `npx prettier --write ./src/components/atoms/${componentName}.tsx`
  );

  //----------------------------------------------
  // Create the storybook
  //----------------------------------------------
  const STORYBOOK_FOLLOW_UP_PROMPT = dedent`
      Can you create a storybook for the above component by importing it using:  
      Because the story will be 1 directory deeper than the component so start with:
      
      import ${componentName}, { ${componentName}Props } from "../${componentName}"
      
      Your response should only have 1 tsx code block which is the implementation of the story. No other text should be included.
    `;
  console.log(chalk.gray(`USER: ${STORYBOOK_FOLLOW_UP_PROMPT}`));

  const generateStorybookResponse = await openai.createChatCompletion({
    model: LLM_MODEL,
    messages: [
      systemPrompt,
      user(ISSUE_BODY),
      assistant(codeBlock),
      user(STORYBOOK_FOLLOW_UP_PROMPT),
    ],
  });
  const rawStoryBookResponse =
    generateStorybookResponse.data.choices[0].message?.content;
  const storybookCodeBlock = rawStoryBookResponse.match(tsxCodeBlockRegex)?.[1];
  console.log(chalk.blue(`ASSISTANT: ${storybookCodeBlock}`));
  await fs.writeFile(
    `./src/components/atoms/__tests__/${componentName}.stories.tsx`,
    storybookCodeBlock,
    "utf8"
  );
  await runCommand(
    `npx prettier --write ./src/components/atoms/__tests__/${componentName}.stories.tsx`
  );
}

export default updateAtomComponent;
