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

type Input = {
  INPUT_LLM_MODEL: "gpt-3.5-turbo" | "gpt-4";
  INPUT_OPENAI_API_KEY: string;
  INPUT_COMMENT_BODY: string;
};

// Doing this instead of zod so we don't have to install dependencies
function isValidInput(input: {[key: string]: any }): input is Input {
  if (
    typeof input.INPUT_LLM_MODEL !== "string" ||
    !["gpt-3.5-turbo", "gpt-4"].includes(input.INPUT_LLM_MODEL)
  ) {
    throw new Error(`Invalid INPUT_LLM_MODEL: ${input.INPUT_LLM_MODEL}`);
  }
  if (typeof input.INPUT_OPENAI_API_KEY !== "string" || input.INPUT_OPENAI_API_KEY === "") {
    throw new Error(`Invalid INPUT_OPENAI_API_KEY: ${input.INPUT_OPENAI_API_KEY}`);
  }
  if (typeof input.INPUT_COMMENT_BODY !== "string" || input.INPUT_COMMENT_BODY === "") {
    throw new Error(`Invalid INPUT_COMMENT_BODY: ${input.INPUT_COMMENT_BODY}`);
  }
  return true;
}

async function updateReactComponent(input: {[key: string]: any }) {
  console.log(input);
  // if (!isValidInput(input)) {
  //   throw new Error("Invalid input");
  // }
}

updateReactComponent(process.env);
export default updateReactComponent;
