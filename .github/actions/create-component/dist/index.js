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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util_1 = require("./util");
// Doing this instead of zod so we don't have to install dependencies
function isValidInput(input) {
    if (typeof input.INPUT_LLM_MODEL !== "string" ||
        !["gpt-3.5-turbo", "gpt-4"].includes(input.INPUT_LLM_MODEL)) {
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
function createReactComponent(input) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        if (!isValidInput(input)) {
            throw new Error("Invalid input");
        }
        const { INPUT_ISSUE_BODY, INPUT_OPENAI_API_KEY, INPUT_LLM_MODEL } = input;
        const systemPrompt = (0, util_1.system) `
      You are a react component generator I will feed you a markdown file that contains a component description.
      Your job is to create a nextjs component using tailwind and typescript.
      Please include a default export. Do not add any additional libraries or dependencies. 
      Your response should only have 1 tsx code block which is the implementation of the component. No other text should be included.
      Remember to export the component & types like this:
      export default ComponentName
      export { ComponentNameProps }
    `;
        (0, util_1.colorLog)("green", `SYSTEM: ${systemPrompt.content}`);
        (0, util_1.colorLog)("gray", `USER: ${INPUT_ISSUE_BODY}`);
        const generateComponentResponse = yield (0, util_1.simpleFetch)("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${INPUT_OPENAI_API_KEY}`, // Replace API_KEY with your actual OpenAI API key
            },
            body: JSON.stringify({
                model: INPUT_LLM_MODEL,
                messages: [systemPrompt, (0, util_1.user)(INPUT_ISSUE_BODY)],
            }),
        });
        const rawComponentResponse = (_a = (yield generateComponentResponse.json()).data
            .choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
        // grab the text inside the code block
        let componentName = (_b = rawComponentResponse.match(util_1.exportDefaultRegex)) === null || _b === void 0 ? void 0 : _b[1];
        if (componentName === "function") {
            // if the component name is function then we need to grab the next word
            componentName = (_c = rawComponentResponse.match(util_1.exportDefaultFunctionRegex)) === null || _c === void 0 ? void 0 : _c[1];
        }
        let codeBlock = (_d = rawComponentResponse.match(util_1.tsxCodeBlockRegex)) === null || _d === void 0 ? void 0 : _d[1];
        if (codeBlock.includes(`export { ${componentName}Props }`) &&
            codeBlock.includes(`export type ${componentName}Props`)) {
            // If the props are exported twice then remove the second export
            codeBlock = codeBlock.replace(`export { ${componentName}Props }`, "");
        }
        (0, util_1.colorLog)("blue", `ASSISTANT: ${codeBlock}`);
        yield fs_1.promises.writeFile(`./src/components/atoms/${componentName}.tsx`, codeBlock, "utf8");
        yield (0, util_1.runCommand)(`npx prettier --write ./src/components/atoms/${componentName}.tsx`);
        //----------------------------------------------
        // Create the storybook
        //----------------------------------------------
        const storybookFollowUpPrompt = (0, util_1.user)(`
      Can you create a storybook for the above component by importing it using:  
      Because the story will be 1 directory deeper than the component so start with:
      
      import ${componentName}, { ${componentName}Props } from "../${componentName}"
      
      Your response should only have 1 tsx code block which is the implementation of the story. No other text should be included.
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
                    (0, util_1.user)(INPUT_ISSUE_BODY),
                    (0, util_1.assistant)(codeBlock),
                    storybookFollowUpPrompt,
                ],
            }),
        });
        const rawStoryBookResponse = (_e = (yield generateStorybookResponse.json()).data
            .choices[0].message) === null || _e === void 0 ? void 0 : _e.content;
        const storybookCodeBlock = (_f = rawStoryBookResponse.match(util_1.tsxCodeBlockRegex)) === null || _f === void 0 ? void 0 : _f[1];
        (0, util_1.colorLog)("blue", `ASSISTANT: ${storybookCodeBlock}`);
        yield fs_1.promises.writeFile(`./src/components/atoms/__tests__/${componentName}.stories.tsx`, storybookCodeBlock, "utf8");
        yield (0, util_1.runCommand)(`npx prettier --write ./src/components/atoms/__tests__/${componentName}.stories.tsx`);
    });
}
createReactComponent(process.env);
exports.default = createReactComponent;
