import { promises as fs } from "fs";
import {
  colorLog,
  system,
  user,
  assistant,
  tsxCodeBlockRegex,
  exportDefaultRegex,
  exportDefaultFunctionRegex,
  runCommand,
  simpleFetch
} from "./util";
import os from "os";

type Input = {
  INPUT_LLM_MODEL: "gpt-3.5-turbo-0613" | "gpt-4";
  INPUT_OPENAI_API_KEY: string;
  INPUT_ISSUE_BODY: string;
};

// Doing this instead of zod so we don't have to install dependencies
function isValidInput(input: {[key: string]: any }): input is Input {
  if (
    typeof input.INPUT_LLM_MODEL !== "string" ||
    !["gpt-3.5-turbo-0613", "gpt-4"].includes(input.INPUT_LLM_MODEL)
  ) {
    throw new Error(`Invalid INPUT_LLM_MODEL: ${input.INPUT_LLM_MODEL}`);
  }
  if (typeof input.INPUT_OPENAI_API_KEY !== "string" || input.INPUT_OPENAI_API_KEY === "") {
    throw new Error(`Invalid INPUT_OPENAI_API_KEY: ${input.INPUT_OPENAI_API_KEY}`);
  }
  if (typeof input.INPUT_ISSUE_BODY !== "string" || input.INPUT_ISSUE_BODY === "") {
    throw new Error(`Invalid INPUT_ISSUE_BODY: ${input.INPUT_ISSUE_BODY}`);
  }
  return true;
}

async function updateReactComponent(input: {[key: string]: any }) {
  if (!isValidInput(input)) {
    throw new Error("Invalid input");
  }
  const { INPUT_ISSUE_BODY, INPUT_OPENAI_API_KEY, INPUT_LLM_MODEL } = input;

  const componentNameMatch = INPUT_ISSUE_BODY.match(/### Component Name\s*\n\s*([\w\s]+)\s*\n/);
  const COMPONENT_NAME = componentNameMatch ? componentNameMatch[1].trim() : null;

  const updateInstructionsMatch = INPUT_ISSUE_BODY.match(/### Update Instructions\s*\n\s*([\s\S]+)/);
  const UPDATE_INSTRUCTIONS = updateInstructionsMatch
    ? updateInstructionsMatch[1].trim()
    : null;



  const systemPrompt = system`
    You are a react component generator I will feed you a react component and a markdown file that contains update instructions.
    Your job is to update the nextjs component using tailwind and typescript.
    Do not alter the component name. Do not add any additional libraries or dependencies.
    Remember to export the component & types like this:
    export default ComponentName
    export { ComponentNameProps }
    Your response should only have 1 tsx code block which is the updated implementation of the component.
  `;
  colorLog("green", `SYSTEM: ${systemPrompt.content}`);

  const componentFileContents = await fs.readFile(`./src/components/atoms/${COMPONENT_NAME}.tsx`, 'utf8');
  const userMessageContent = "```tsx\n"+componentFileContents+'\n```\n```md\n'+UPDATE_INSTRUCTIONS+"\n```";

  const userMessage = user(userMessageContent);
  colorLog("gray", `USER: ${userMessage.content}`);

  const generateComponentResponse = await simpleFetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${INPUT_OPENAI_API_KEY}`, // Replace API_KEY with your actual OpenAI API key
      },
      body: JSON.stringify({
        model: INPUT_LLM_MODEL,
        messages: [systemPrompt, userMessage],
      }),
    }
  );

  const rawComponentResponse = (await generateComponentResponse.json()).data
    .choices[0].message?.content;
  let codeBlock = rawComponentResponse.match(tsxCodeBlockRegex)?.[1];
  if (
    codeBlock.includes(`export { ${COMPONENT_NAME}Props }`) &&
    codeBlock.includes(`export type ${COMPONENT_NAME}Props`)
  ) {
    // If the props are exported twice then remove the second export
    codeBlock = codeBlock.replace(`export { ${COMPONENT_NAME}Props }`, "");
  }
  colorLog("blue", `ASSISTANT: ${codeBlock}`);
  await fs.writeFile(
    `./src/components/atoms/${COMPONENT_NAME}.tsx`,
    codeBlock,
    "utf8"
  );
  await runCommand(
    `npx prettier --write ./src/components/atoms/${COMPONENT_NAME}.tsx`
  );

  //----------------------------------------------
  // Create the storybook
  //----------------------------------------------
  const storyFileContents = await fs.readFile(`./src/components/atoms/__tests__/${COMPONENT_NAME}.stories.tsx`, 'utf8');

  const storybookFollowUpPrompt = user(`
    Please update this storybook file to include the changes you made to the component.
    \`\`\`tsx
    ${storyFileContents}
    \`\`\`
    Your response should only have 1 tsx code block which is the implementation of the story.
  `);
  colorLog("gray", `USER: ${storybookFollowUpPrompt.content}`);
  const generateStorybookResponse = await simpleFetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${INPUT_OPENAI_API_KEY}`, // Replace API_KEY with your actual OpenAI API key
      },
      body: JSON.stringify({
        model: INPUT_LLM_MODEL,
        messages: [
          systemPrompt,
          userMessage,
          assistant(codeBlock),
          storybookFollowUpPrompt,
        ],
      }),
    }
  );

  const rawStoryBookResponse = (await generateStorybookResponse.json()).data
    .choices[0].message?.content;
  const storybookCodeBlock = rawStoryBookResponse.match(tsxCodeBlockRegex)?.[1];
  colorLog("blue", `ASSISTANT: ${storybookCodeBlock}`);
  await fs.writeFile(
    `./src/components/atoms/__tests__/${COMPONENT_NAME}.stories.tsx`,
    storybookCodeBlock,
    "utf8"
  );
  await runCommand(
    `npx prettier --write ./src/components/atoms/__tests__/${COMPONENT_NAME}.stories.tsx`
  );

 
  const output = process.env['GITHUB_OUTPUT'] as string;
  await fs.appendFile(output, `componentName=${COMPONENT_NAME}${os.EOL}`) 
}

updateReactComponent(process.env);
export default updateReactComponent;
