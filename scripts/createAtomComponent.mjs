import { z } from 'zod';
import { Configuration, OpenAIApi } from 'openai';
import { promises as fs } from 'fs';
import { runCommand } from './utils.mjs';
import dedent from 'dedent';
import chalk from 'chalk';

const envSchema = z.object({
  LLM_MODEL: z.union([z.literal("gpt-3.5-turbo"), z.literal("gpt-4")]),
  GH_REPO_NAME: z.string(),
  GH_ORG_NAME: z.string(),
  OPENAI_API_KEY: z.string(),
  ISSUE_BODY: z.string(),
});

async function createAtomComponent({ GH_REPO_NAME, GH_ORG_NAME, ISSUE_BODY, OPENAI_API_KEY, LLM_MODEL }) {
    const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_API_KEY }));
  
    console.log(
      `Creating component for ${GH_ORG_NAME}/${GH_REPO_NAME} with description ${ISSUE_BODY}`
    );
    const SYSTEM_PROMPT = dedent`
      You are a react component generator I will feed you a markdown file that contains a component description.
      Your job is to create a nextjs component using tailwind and typescript, export all types.
      Please include a default export. Do not add any additional libraries or dependencies. 
      Your response should only have 1 tsx code block which is the implementation of the component.
    `;
    console.log(chalk.green(`SYSTEM: ${SYSTEM_PROMPT}`));
    const SYSTEM_MESSAGE = { role: "system", content: SYSTEM_PROMPT };
    console.log(chalk.gray(`USER: ${ISSUE_BODY}`));
    const USER_MESSAGE = { role: "user", content: ISSUE_BODY };
    
    const generateComponentResponse = await openai.createChatCompletion({
        model: LLM_MODEL,
        messages: [SYSTEM_MESSAGE, USER_MESSAGE],
    });

    // grab the text inside the code block
    const codeBlock = generateComponentResponse.data.choices[0].message?.content.match(/```(?:tsx)?(.*)```/s)?.[1];
    const componentName = generateComponentResponse.data.choices[0].message?.content.match(/export\s+default\s+([\w]+)/s)?.[1];
    console.log(chalk.blue(`ASSISTANT: ${codeBlock}`));
    await fs.writeFile(`./src/components/atoms/${componentName}.tsx`, codeBlock, 'utf8');
    await runCommand(`npx prettier --write ./src/components/atoms/${componentName}.tsx`);
    const ASSISTANT_MESSAGE = { role: "assistant", content: codeBlock };

    const STORYBOOK_FOLLOW_UP_PROMPT=dedent`
      Can you create a storybook for the above component by importing it using:  
      import ${componentName}, { ${componentName}Props } from '../${componentName}' 
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
    await fs.writeFile(`./src/components/atoms/__tests__/${componentName}.stories.tsx`, storybookCodeBlock, 'utf8');
    await runCommand(`npx prettier --write ./src/components/atoms/__tests__/${componentName}.stories.tsx`);
}

createAtomComponent(envSchema.parse(process.env));