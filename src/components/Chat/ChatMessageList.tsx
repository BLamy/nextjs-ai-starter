"use client";
import React, { useRef, useEffect } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { ChatBubble } from "./ChatBubble";

type Props = {
  messages: ChatCompletionRequestMessage[];
};

export const ChatMessageList: React.FC<Props> = ({ messages }) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      const chatContainer = chatContainerRef.current;
      const scrollHeight = chatContainer.scrollHeight;
      const clientHeight = chatContainer.clientHeight;

      chatContainer.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="w-full h-full overflow-y-scroll" ref={chatContainerRef}>
      {messages.map((message, index) => (
        <ChatBubble key={index} message={message} index={index} />
      ))}
    </div>
  );
};