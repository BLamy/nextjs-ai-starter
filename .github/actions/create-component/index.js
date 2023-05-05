"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.runCommand = void 0;
var zod_1 = require("zod");
var openai_1 = require("openai");
var fs_1 = require("fs");
var chalk_1 = require("chalk");
var child_process_1 = require("child_process");
var ts_dedent_1 = require("ts-dedent");
function system(literals) {
    var placeholders = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        placeholders[_i - 1] = arguments[_i];
    }
    return {
        role: "system",
        content: ts_dedent_1["default"].apply(void 0, __spreadArray([literals], placeholders, false))
    };
}
function user(literals) {
    var placeholders = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        placeholders[_i - 1] = arguments[_i];
    }
    return {
        role: "user",
        content: ts_dedent_1["default"].apply(void 0, __spreadArray([literals], placeholders, false))
    };
}
function assistant(literals) {
    var placeholders = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        placeholders[_i - 1] = arguments[_i];
    }
    return {
        role: "assistant",
        content: ts_dedent_1["default"].apply(void 0, __spreadArray([literals], placeholders, false))
    };
}
var tsxCodeBlockRegex = /```(?:tsx)?(.*)```/s;
var envSchema = zod_1.z.object({
    LLM_MODEL: zod_1.z.union([zod_1.z.literal("gpt-3.5-turbo"), zod_1.z.literal("gpt-4")]),
    OPENAI_API_KEY: zod_1.z.string(),
    ISSUE_BODY: zod_1.z.string()
});
function runCommand(command) {
    return new Promise(function (resolve, reject) {
        (0, child_process_1.exec)(command, function (error, stdout, stderr) {
            if (error) {
                reject(new Error("Error executing command: ".concat(error.message)));
                return;
            }
            if (stderr) {
                console.error("stderr: ".concat(stderr));
            }
            resolve(stdout);
        });
    });
}
exports.runCommand = runCommand;
function updateAtomComponent(input) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var _g, ISSUE_BODY, OPENAI_API_KEY, LLM_MODEL, openai, systemPrompt, generateComponentResponse, rawComponentResponse, exportDefaultRegex, componentName, exportDefaultFunctionRegex, codeBlock, STORYBOOK_FOLLOW_UP_PROMPT, generateStorybookResponse, rawStoryBookResponse, storybookCodeBlock;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _g = envSchema.parse(input), ISSUE_BODY = _g.ISSUE_BODY, OPENAI_API_KEY = _g.OPENAI_API_KEY, LLM_MODEL = _g.LLM_MODEL;
                    openai = new openai_1.OpenAIApi(new openai_1.Configuration({ apiKey: OPENAI_API_KEY }));
                    systemPrompt = system(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      You are a react component generator I will feed you a markdown file that contains a component description.\n      Your job is to create a nextjs component using tailwind and typescript.\n      Please include a default export. Do not add any additional libraries or dependencies. \n      Your response should only have 1 tsx code block which is the implementation of the component. No other text should be included.\n      Remember to export the component & types like this:\n      export default ComponentName\n      export { ComponentNameProps }\n    "], ["\n      You are a react component generator I will feed you a markdown file that contains a component description.\n      Your job is to create a nextjs component using tailwind and typescript.\n      Please include a default export. Do not add any additional libraries or dependencies. \n      Your response should only have 1 tsx code block which is the implementation of the component. No other text should be included.\n      Remember to export the component & types like this:\n      export default ComponentName\n      export { ComponentNameProps }\n    "])));
                    console.log(chalk_1["default"].green("SYSTEM: ".concat(systemPrompt.content)));
                    console.log(chalk_1["default"].gray("USER: ".concat(ISSUE_BODY)));
                    return [4 /*yield*/, openai.createChatCompletion({
                            model: LLM_MODEL,
                            messages: [systemPrompt, user(ISSUE_BODY)]
                        })];
                case 1:
                    generateComponentResponse = _h.sent();
                    rawComponentResponse = (_a = generateComponentResponse.data.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
                    exportDefaultRegex = /export\s+default\s+([\w]+)/s;
                    componentName = (_b = rawComponentResponse.match(exportDefaultRegex)) === null || _b === void 0 ? void 0 : _b[1];
                    if (componentName === "function") {
                        exportDefaultFunctionRegex = /export\s+default\s+function\s+([\w]+)/s;
                        componentName = (_c = rawComponentResponse.match(exportDefaultFunctionRegex)) === null || _c === void 0 ? void 0 : _c[1];
                    }
                    codeBlock = (_d = rawComponentResponse.match(tsxCodeBlockRegex)) === null || _d === void 0 ? void 0 : _d[1];
                    if (codeBlock.includes("export { ".concat(componentName, "Props }")) &&
                        codeBlock.includes("export type ".concat(componentName, "Props"))) {
                        // If the props are exported twice then remove the second export
                        codeBlock = codeBlock.replace("export { ".concat(componentName, "Props }"), "");
                    }
                    console.log(chalk_1["default"].blue("ASSISTANT: ".concat(codeBlock)));
                    return [4 /*yield*/, fs_1.promises.writeFile("./src/components/atoms/".concat(componentName, ".tsx"), codeBlock, "utf8")];
                case 2:
                    _h.sent();
                    return [4 /*yield*/, runCommand("npx prettier --write ./src/components/atoms/".concat(componentName, ".tsx"))];
                case 3:
                    _h.sent();
                    STORYBOOK_FOLLOW_UP_PROMPT = (0, ts_dedent_1["default"])(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      Can you create a storybook for the above component by importing it using:  \n      Because the story will be 1 directory deeper than the component so start with:\n      \n      import ", ", { ", "Props } from \"../", "\"\n      \n      Your response should only have 1 tsx code block which is the implementation of the story. No other text should be included.\n    "], ["\n      Can you create a storybook for the above component by importing it using:  \n      Because the story will be 1 directory deeper than the component so start with:\n      \n      import ", ", { ", "Props } from \"../", "\"\n      \n      Your response should only have 1 tsx code block which is the implementation of the story. No other text should be included.\n    "])), componentName, componentName, componentName);
                    console.log(chalk_1["default"].gray("USER: ".concat(STORYBOOK_FOLLOW_UP_PROMPT)));
                    return [4 /*yield*/, openai.createChatCompletion({
                            model: LLM_MODEL,
                            messages: [
                                systemPrompt,
                                user(ISSUE_BODY),
                                assistant(codeBlock),
                                user(STORYBOOK_FOLLOW_UP_PROMPT),
                            ]
                        })];
                case 4:
                    generateStorybookResponse = _h.sent();
                    rawStoryBookResponse = (_e = generateStorybookResponse.data.choices[0].message) === null || _e === void 0 ? void 0 : _e.content;
                    storybookCodeBlock = (_f = rawStoryBookResponse.match(tsxCodeBlockRegex)) === null || _f === void 0 ? void 0 : _f[1];
                    console.log(chalk_1["default"].blue("ASSISTANT: ".concat(storybookCodeBlock)));
                    return [4 /*yield*/, fs_1.promises.writeFile("./src/components/atoms/__tests__/".concat(componentName, ".stories.tsx"), storybookCodeBlock, "utf8")];
                case 5:
                    _h.sent();
                    return [4 /*yield*/, runCommand("npx prettier --write ./src/components/atoms/__tests__/".concat(componentName, ".stories.tsx"))];
                case 6:
                    _h.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = updateAtomComponent;
var templateObject_1, templateObject_2;
