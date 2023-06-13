"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util_1 = require("./util");
const os_1 = __importDefault(require("os"));
// Doing this instead of zod so we don't have to install dependencies
function isValidInput(input) {
    if (typeof input.INPUT_LLM_MODEL !== "string" ||
        !["gpt-3.5-turbo-0613", "gpt-4"].includes(input.INPUT_LLM_MODEL)) {
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
function updateReactComponent(input) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
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
        const systemPrompt = (0, util_1.system) `
    You are a react component generator I will feed you a react component and a markdown file that contains update instructions.
    Your job is to update the nextjs component using tailwind and typescript.
    Do not alter the component name. Do not add any additional libraries or dependencies.
    Remember to export the component & types like this:
    export default ComponentName
    export { ComponentNameProps }
    Your response should only have 1 tsx code block which is the updated implementation of the component.
  `;
        (0, util_1.colorLog)("green", `SYSTEM: ${systemPrompt.content}`);
        const componentFileContents = yield fs_1.promises.readFile(`./src/components/atoms/${COMPONENT_NAME}.tsx`, 'utf8');
        const userMessageContent = "```tsx\n" + componentFileContents + '\n```\n```md\n' + UPDATE_INSTRUCTIONS + "\n```";
        const userMessage = (0, util_1.user)(userMessageContent);
        (0, util_1.colorLog)("gray", `USER: ${userMessage.content}`);
        const generateComponentResponse = yield (0, util_1.simpleFetch)("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${INPUT_OPENAI_API_KEY}`, // Replace API_KEY with your actual OpenAI API key
            },
            body: JSON.stringify({
                model: INPUT_LLM_MODEL,
                messages: [systemPrompt, userMessage],
            }),
        });
        const rawComponentResponse = (_a = (yield generateComponentResponse.json()).data
            .choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
        let codeBlock = (_b = rawComponentResponse.match(util_1.tsxCodeBlockRegex)) === null || _b === void 0 ? void 0 : _b[1];
        if (codeBlock.includes(`export { ${COMPONENT_NAME}Props }`) &&
            codeBlock.includes(`export type ${COMPONENT_NAME}Props`)) {
            // If the props are exported twice then remove the second export
            codeBlock = codeBlock.replace(`export { ${COMPONENT_NAME}Props }`, "");
        }
        (0, util_1.colorLog)("blue", `ASSISTANT: ${codeBlock}`);
        yield fs_1.promises.writeFile(`./src/components/atoms/${COMPONENT_NAME}.tsx`, codeBlock, "utf8");
        yield (0, util_1.runCommand)(`npx prettier --write ./src/components/atoms/${COMPONENT_NAME}.tsx`);
        //----------------------------------------------
        // Create the storybook
        //----------------------------------------------
        const storyFileContents = yield fs_1.promises.readFile(`./src/components/atoms/__tests__/${COMPONENT_NAME}.stories.tsx`, 'utf8');
        const storybookFollowUpPrompt = (0, util_1.user)(`
    Please update this storybook file to include the changes you made to the component.
    \`\`\`tsx
    ${storyFileContents}
    \`\`\`
    Your response should only have 1 tsx code block which is the implementation of the story.
  `);
        (0, util_1.colorLog)("gray", `USER: ${storybookFollowUpPrompt.content}`);
        const generateStorybookResponse = yield (0, util_1.simpleFetch)("https://api.openai.com/v1/chat/completions", {
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
                    (0, util_1.assistant)(codeBlock),
                    storybookFollowUpPrompt,
                ],
            }),
        });
        const rawStoryBookResponse = (_c = (yield generateStorybookResponse.json()).data
            .choices[0].message) === null || _c === void 0 ? void 0 : _c.content;
        const storybookCodeBlock = (_d = rawStoryBookResponse.match(util_1.tsxCodeBlockRegex)) === null || _d === void 0 ? void 0 : _d[1];
        (0, util_1.colorLog)("blue", `ASSISTANT: ${storybookCodeBlock}`);
        yield fs_1.promises.writeFile(`./src/components/atoms/__tests__/${COMPONENT_NAME}.stories.tsx`, storybookCodeBlock, "utf8");
        yield (0, util_1.runCommand)(`npx prettier --write ./src/components/atoms/__tests__/${COMPONENT_NAME}.stories.tsx`);
        const output = process.env['GITHUB_OUTPUT'];
        yield fs_1.promises.appendFile(output, `componentName=${COMPONENT_NAME}${os_1.default.EOL}`);
    });
}
updateReactComponent(process.env);
exports.default = updateReactComponent;
