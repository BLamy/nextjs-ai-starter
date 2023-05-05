import { promises as fs } from "fs";
import {
  colorLog,
  system,
  user,
  assistant,
  tsxCodeBlockRegex,
  exportDefaultRegex,
  exportDefaultFunctionRegex,
  runCommand
} from "./util";

type Input = {
  LLM_MODEL: "gpt-3.5-turbo" | "gpt-4";
  OPENAI_API_KEY: string;
  ISSUE_BODY: string;
};

// Doing this instead of zod so we don't have to install dependencies
function isValidInput(input: {[key: string]: any }): input is Input {
  if (
    typeof input.LLM_MODEL !== "string" ||
    !["gpt-3.5-turbo", "gpt-4"].includes(input.LLM_MODEL)
  ) {
    return false;
  }
  if (typeof input.OPENAI_API_KEY !== "string" || input.OPENAI_API_KEY === "") {
    return false;
  }
  if (typeof input.ISSUE_BODY !== "string" || input.ISSUE_BODY === "") {
    return false;
  }
  return true;
}

async function createReactComponent(input: {[key: string]: any }) {
  if (!isValidInput(input)) {
    throw new Error("Invalid input");
  }
  const { ISSUE_BODY, OPENAI_API_KEY, LLM_MODEL } = input;

  const systemPrompt = system`
      You are a react component generator I will feed you a markdown file that contains a component description.
      Your job is to create a nextjs component using tailwind and typescript.
      Please include a default export. Do not add any additional libraries or dependencies. 
      Your response should only have 1 tsx code block which is the implementation of the component. No other text should be included.
      Remember to export the component & types like this:
      export default ComponentName
      export { ComponentNameProps }
    `;
  colorLog("green", `SYSTEM: ${systemPrompt.content}`);
  colorLog("gray", `USER: ${ISSUE_BODY}`);

  const generateComponentResponse = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`, // Replace API_KEY with your actual OpenAI API key
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        messages: [systemPrompt, user(ISSUE_BODY)],
      }),
    }
  );

  const rawComponentResponse = (await generateComponentResponse.json()).data
    .choices[0].message?.content;
  // grab the text inside the code block
  let componentName = rawComponentResponse.match(exportDefaultRegex)?.[1];
  if (componentName === "function") {
    // if the component name is function then we need to grab the next word
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
  colorLog("blue", `ASSISTANT: ${codeBlock}`);
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
  const storybookFollowUpPrompt = user(`
      Can you create a storybook for the above component by importing it using:  
      Because the story will be 1 directory deeper than the component so start with:
      
      import ${componentName}, { ${componentName}Props } from "../${componentName}"
      
      Your response should only have 1 tsx code block which is the implementation of the story. No other text should be included.
    `);
  colorLog("gray", `USER: ${storybookFollowUpPrompt.content}`);
  const generateStorybookResponse = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`, // Replace API_KEY with your actual OpenAI API key
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        messages: [
          systemPrompt,
          user(ISSUE_BODY),
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
    `./src/components/atoms/__tests__/${componentName}.stories.tsx`,
    storybookCodeBlock,
    "utf8"
  );
  await runCommand(
    `npx prettier --write ./src/components/atoms/__tests__/${componentName}.stories.tsx`
  );
}

export default createReactComponent;
