import { ChatCompletionRequestMessage } from "openai";

export function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function bubbleColorForMessage(message: ChatCompletionRequestMessage) {
  switch (message.role) {
    case "system":
      return "bg-green-bubble";
    case "user":
      return "bg-blue-bubble";
    case "assistant": // We didn't forget about assistant we just want it to be the same as default
    default:
      return "";
  }
}
