import { z } from 'zod';
import { Configuration, OpenAIApi } from 'openai';
import { promises as fs } from 'fs';
import chalk from 'chalk';
import dedent from 'dedent';
import { exec } from 'child_process';

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

const envSchema = z.object({
  LLM_MODEL: z.union([z.literal("gpt-3.5-turbo"), z.literal("gpt-4")]),
  GH_REPO_NAME: z.string(),
  GH_ORG_NAME: z.string(),
  OPENAI_API_KEY: z.string(),
  ISSUE_BODY: z.string(),
});

async function updateAtomComponent({ GH_REPO_NAME, GH_ORG_NAME, ISSUE_BODY, OPENAI_API_KEY, LLM_MODEL }) {
    const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_API_KEY }));

    const componentNameMatch = ISSUE_BODY.match(/### Component Name\s*\n\s*([\w\s]+)\s*\n/);
    const COMPONENT_NAME = componentNameMatch ? componentNameMatch[1].trim() : null;
  
    const updateInstructionsMatch = ISSUE_BODY.match(/### Update Instructions\s*\n\s*([\s\S]+)/);
    const UPDATE_INSTRUCTIONS = updateInstructionsMatch
      ? updateInstructionsMatch[1].trim()
      : null;

    console.log(
      `Updating ${COMPONENT_NAME} for ${GH_ORG_NAME}/${GH_REPO_NAME} with description ${UPDATE_INSTRUCTIONS}`
    );
    const SYSTEM_PROMPT = dedent`
      You are a react component generator I will feed you a react component and a markdown file that contains update instructions.
      Your job is to update the nextjs component using tailwind and typescript.
      Do not alter the component name. Do not add any additional libraries or dependencies.
      Remember to export the component & types like this:
      export default ComponentName
      export { ComponentNameProps }
      Your response should only have 1 tsx code block which is the updated implementation of the component.
    `;
    console.log(chalk.green(`SYSTEM: ${SYSTEM_PROMPT}`));
    const SYSTEM_MESSAGE = { role: "system", content: SYSTEM_PROMPT };
    const componentFileContents = await fs.readFile(`./src/components/atoms/${COMPONENT_NAME}.tsx`, 'utf8');
    const userMessageContent = "```tsx\n"+componentFileContents+'\n```\n```md\n'+UPDATE_INSTRUCTIONS+"\n```";

    console.log(chalk.gray(`USER: ${userMessageContent}`));
    const USER_MESSAGE = { role: "user", content: userMessageContent };
    
    const generateComponentResponse = await openai.createChatCompletion({
        model: LLM_MODEL,
        messages: [SYSTEM_MESSAGE, USER_MESSAGE],
    });

    let codeBlock = generateComponentResponse.data.choices[0].message?.content.match(/```(?:tsx)?(.*)```/s)?.[1];
    if (codeBlock.includes(`export { ${COMPONENT_NAME}Props }`) && codeBlock.includes(`export type ${COMPONENT_NAME}Props`)) {
      // If the props are exported twice then remove the second export
      codeBlock = codeBlock.replace(`export { ${COMPONENT_NAME}Props }`, "");
    }

    console.log(chalk.blue(`ASSISTANT: ${codeBlock}`));
    const ASSISTANT_MESSAGE = { role: "assistant", content: codeBlock };
    await fs.writeFile(`./src/components/atoms/${COMPONENT_NAME}.tsx`, codeBlock, 'utf8');
    await runCommand(`npx prettier --write ./src/components/atoms/${COMPONENT_NAME}.tsx`);

    const storyFileContents = await fs.readFile(`./src/components/atoms/__tests__/${COMPONENT_NAME}.stories.tsx`, 'utf8');

    const STORYBOOK_FOLLOW_UP_PROMPT=dedent`
      Please update this storybook file to include the changes you made to the component.
      \`\`\`tsx
      ${storyFileContents}
      \`\`\`
      Your response should only have 1 tsx code block which is the implementation of the story.
    `;
    const STORYBOOK_FOLLOW_UP_MESSAGE = { role: "user", content: STORYBOOK_FOLLOW_UP_PROMPT };
    console.log(chalk.gray(`USER: ${STORYBOOK_FOLLOW_UP_PROMPT}`));

    const generateStorybookResponse = await openai.createChatCompletion({
      model: LLM_MODEL,
      messages: [SYSTEM_MESSAGE, USER_MESSAGE, ASSISTANT_MESSAGE, STORYBOOK_FOLLOW_UP_MESSAGE],
    });

    const storybookCodeBlock = generateStorybookResponse.data.choices[0].message?.content.match(/```(?:tsx)?(.*)```/s)?.[1];
    console.log(storybookCodeBlock);
    console.log(chalk.blue(`ASSISTANT: ${storybookCodeBlock}`));
    await fs.writeFile(`./src/components/atoms/__tests__/${COMPONENT_NAME}.stories.tsx`, storybookCodeBlock, 'utf8');
    await runCommand(`npx prettier --write ./src/components/atoms/__tests__/${COMPONENT_NAME}.stories.tsx`);
}

updateAtomComponent(envSchema.parse(process.env));