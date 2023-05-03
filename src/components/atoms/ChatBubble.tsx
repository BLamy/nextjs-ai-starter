import React from "react";
import { ChatCompletionRequestMessageRoleEnum } from "openai";

export function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function bubbleColorForMessage(
  role: ChatCompletionRequestMessageRoleEnum
) {
  switch (role) {
    case "system":
      return "bg-green-bubble";
    case "user":
      return "bg-blue-bubble";
    case "assistant": // We didn't forget about assistant we just want it to be the same as default
    default:
      return "";
  }
}

export type ChatBubbleProps = {
  role: ChatCompletionRequestMessageRoleEnum;
  content: string;
  name?: string;
  index?: number;
};

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  index = 0,
  role,
  content,
  name,
}) => {
  return (
    <div
      key={index}
      className={`chat ${role === "assistant" ? "chat-start" : "chat-end"}`}
    >
      <div className="chat-header capitalize">
        {role} {name && `(${name})`}
      </div>
      <div
        className={`chat-bubble ${
          index > 0 && content.includes('"error":')
            ? "bg-red-700"
            : bubbleColorForMessage(role)
        }`}
      >
        <pre className="whitespace-pre-wrap text-white">
          {isJsonString(content)
            ? JSON.stringify(JSON.parse(content), null, 2)
            : content}
        </pre>
      </div>
    </div>
  );
};

export default ChatBubble;
