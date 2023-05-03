import React from "react";
import { ChatCompletionRequestMessage } from "openai";
import ServerChat from "./Chat.server";
import ClientChat from "./Chat.client";

type Props = {
  messages: ChatCompletionRequestMessage[];
  onMessageSend?: (message: string) => void;
};

export const Chat: React.FC<Props> = ({ messages, onMessageSend }) => {
  // if onMessageSend is not provided, we will use window.ai to send the message
  return onMessageSend ? (
    <ServerChat messages={messages} onMessageSend={onMessageSend} />
  ) : (
    <ClientChat defaultMessages={messages} />
  );
};

export default Chat;
