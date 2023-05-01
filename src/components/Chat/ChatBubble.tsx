import React from "react";
import { ChatCompletionRequestMessage } from "openai";
import { isJsonString, bubbleColorForMessage } from "./util";

export const ChatBubble: React.FC<{
  message: ChatCompletionRequestMessage;
  index?: number;
}> = ({ index = 0, message }) => {
  return (
    <div
      key={index}
      className={`chat ${
        message.role === "assistant" ? "chat-start" : "chat-end"
      }`}
    >
      <div className="chat-header capitalize">
        {message.role} {message.name && `(${message.name})`}
      </div>
      <div
        className={`chat-bubble ${
          index > 0 && message.content.includes('"error":')
            ? "bg-red-700"
            : bubbleColorForMessage(message)
        }`}
      >
        <pre className="whitespace-pre-wrap text-white">
          {isJsonString(message.content)
            ? JSON.stringify(JSON.parse(message.content), null, 2)
            : message.content}
        </pre>
      </div>
    </div>
  );
};