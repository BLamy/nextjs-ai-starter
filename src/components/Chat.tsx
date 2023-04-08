"use client";
import React, { useRef, useEffect } from "react";
import { ChatCompletionRequestMessage } from "openai";
function isJsonString(str: string) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}
function bubbleColorForMessage(message: ChatCompletionRequestMessage) {
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
type Props = {
  messages: ChatCompletionRequestMessage[];
};
export const Chat: React.FC<Props> = ({ messages }) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
        const chatContainer = chatContainerRef.current;
        const scrollHeight = chatContainer.scrollHeight;
        const clientHeight = chatContainer.clientHeight;
    
        chatContainer.scrollTo({
          top: scrollHeight - clientHeight,
          behavior: 'smooth',
        });
    }
  }, []);

  return (
    <div
      className="w-full h-full overflow-y-scroll"
      ref={chatContainerRef}
    >
      {messages.map((message, index) => (
        <div key={index} className={`chat ${message.role === "assistant" ? "chat-start" : "chat-end"}`}>
          <div className="chat-header capitalize">
            {message.role} {message.name && `(${message.name})`}
          </div>
          <div className={`chat-bubble ${index > 0 && message.content.includes('"error":') ? "bg-red-700" : bubbleColorForMessage(message)}`}>
            <pre className="whitespace-pre-wrap text-white">
              {isJsonString(message.content) ? JSON.stringify(JSON.parse(message.content), null, 2) : message.content}
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
