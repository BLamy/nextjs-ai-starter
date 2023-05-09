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
    if (typeof input.INPUT_COMMENT_BODY !== "string" || input.INPUT_COMMENT_BODY === "") {
        throw new Error(`Invalid INPUT_COMMENT_BODY: ${input.INPUT_COMMENT_BODY}`);
    }
    if (typeof input.COMPONENT_NAME !== "string" || input.COMPONENT_NAME === "") {
        throw new Error(`Invalid COMPONENT_NAME: ${input.COMPONENT_NAME}`);
    }
    return true;
}
function updateReactComponent(input) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        console.log(input);
        if (!isValidInput(input)) {
            throw new Error("Invalid input");
        }
        const { INPUT_COMMENT_BODY, INPUT_OPENAI_API_KEY, INPUT_LLM_MODEL, COMPONENT_NAME } = input;
        const systemPrompt = (0, util_1.system) `
    You are a react component generator I will feed you a react component and a comment that came from code review.
    Your job is to update the nextjs component using tailwind and typescript.
    Do not alter the component name. Do not add any additional libraries or dependencies.
    Remember to export the component & types like this:
    export default ComponentName
    export { ComponentNameProps }
    Your response should only have 1 tsx code block which is the updated implementation of the component.
  `;
        (0, util_1.colorLog)("green", `SYSTEM: ${systemPrompt.content}`);
        const matches = INPUT_COMMENT_BODY.match(util_1.gptCodeBlockRegex);
        console.log(matches);
        if (!matches || matches.length < 3) {
            throw new Error("No code block found");
        }
        const [_, model, comment] = matches;
        const userMessage = (0, util_1.user)(comment);
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
    });
}
updateReactComponent({
    INPUT_LLM_MODEL: "gpt-3.5-turbo",
    INPUT_OPENAI_API_KEY: "sk-123",
    INPUT_COMMENT_BODY: "```gpt-3.5-turbo\nCan You add And wextra small size\n```\n"
});
exports.default = updateReactComponent;
