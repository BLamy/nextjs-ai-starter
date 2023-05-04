import { z } from 'zod';
import { Configuration, OpenAIApi } from 'openai';
import { promises as fs } from 'fs';
import { runCommand, generateRandomHash } from './utils.mjs';
import { dedent } from 'ts-dedent';

const envSchema = z.object({
  GH_REPO_NAME: z.string(),
  GH_ORG_NAME: z.string(),
  OPENAI_API_KEY: z.string(),
  GH_API_KEY: z.string(),
});
const argsSchema = z.object({
  desc: z.string(),
  issueNumber: z.number(),
  issueTitle: z.string(),
});

async function createAtomComponent({ GH_REPO_NAME, GH_ORG_NAME, desc, OPENAI_API_KEY, GH_API_KEY, issueNumber, issueTitle }) {
  issueNumber=generateRandomHash() // TODO remove this
    await runCommand(`git checkout -b issue-${issueNumber}-update`);
    const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_API_KEY }));
  
    console.log(
      `Creating component for ${GH_ORG_NAME}/${GH_REPO_NAME} with description ${desc}`
    );
    const SYSTEM_PROMPT = dedent`
      You are a react component generator I will feed you a markdown file that contains a component description.
      Your job is to create a nextjs component using typescript and tailwind. 
      Please include a default export & export the Prop as a typescript type named ComponentNameProps. 
      Do not add any additional libraries or dependencies. 
      Your response should only have 1 tsx code block which is the implementation of the component.
    `;
    console.log(`SYSTEM: ${SYSTEM_PROMPT}`);
    const SYSTEM_MESSAGE = { role: "system", content: SYSTEM_PROMPT };
    console.log(`USER: ${desc}`);
    const USER_MESSAGE = { role: "user", content: desc };
    
    const generateComponentResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [SYSTEM_MESSAGE, USER_MESSAGE],
    });

    // grab the text inside the code block
    const codeBlock = generateComponentResponse.data.choices[0].message?.content.match(/```(?:tsx)?(.*)```/s)?.[1];
    const componentName = generateComponentResponse.data.choices[0].message?.content.match(/export\s+default\s+([\w]+)/s)?.[1];
    console.log(`ASSISTANT: ${codeBlock}`);
    await fs.writeFile(`./src/components/atoms/${componentName}.tsx`, codeBlock, 'utf8');
    await runCommand(`npx prettier --write ./src/components/atoms/${componentName}.tsx`);
    const ASSISTANT_MESSAGE = { role: "assistant", content: codeBlock };

    const STORYBOOK_FOLLOW_UP_PROMPT=dedent`
      Can you create a storybook for the above component by importing it using:  
      import ${componentName}, { ${componentName}Props } from '../${componentName}' 
      Your response should only have 1 tsx code block which is the implementation of the story.
    `;
    const STORYBOOK_FOLLOW_UP_MESSAGE = { role: "user", content: STORYBOOK_FOLLOW_UP_PROMPT };
    console.log(`USER: ${STORYBOOK_FOLLOW_UP_PROMPT}`);

    const generateStorybookResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [SYSTEM_MESSAGE, USER_MESSAGE, ASSISTANT_MESSAGE, STORYBOOK_FOLLOW_UP_MESSAGE],
    });

    const storybookCodeBlock = generateStorybookResponse.data.choices[0].message?.content.match(/```(?:tsx)?(.*)```/s)?.[1];
    console.log(storybookCodeBlock);
    console.log(`ASSISTANT: ${storybookCodeBlock}`);
    await fs.writeFile(`./src/components/atoms/__tests__/${componentName}.stories.tsx`, storybookCodeBlock, 'utf8');
    await runCommand(`npx prettier --write ./src/components/atoms/__tests__/${componentName}.stories.tsx`);
    console.log(await runCommand(`git status`));

    await runCommand(`git add ./src`);
    console.log(await runCommand(`git status`));
    await runCommand(`git commit -m "${issueTitle} closes #${issueNumber}"`);
    await runCommand(`git push origin issue-${issueNumber}-update`);
    console.log(await runCommand(`git status`));

    // #     curl https://api.github.com/repos/${GH_ORG_NAME}/${GH_REPO_NAME}/pulls 
    // -H "Authorization: token ${{ env.GH_API_KEY }}" 
    // -H "Accept: application/vnd.github+json" 
    // -X POST 
    // -d '{
    // "title":"${{ github.event.issue.title }} - closes #${{ github.event.issue.number }}", 
    // "body":"${{ steps.setup.outputs.ESCAPED_ISSUE_BODY }}", 
    // "head":"issue-${{ github.event.issue.number }}-update", 
    // "base":"main"}'
}

const env = envSchema.parse(process.env);
const args = argsSchema.parse({
  issueNumber: process.argv[1],
  issueTitle: process.argv[2],
  desc: process.argv[3],
});
createAtomComponent({ ...env, ...args });