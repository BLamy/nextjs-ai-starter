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
function updateReactComponent(input) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(input);
        if (!isValidInput(input)) {
            throw new Error("Invalid input");
        }
    });
}
updateReactComponent(process.env);
exports.default = updateReactComponent;
