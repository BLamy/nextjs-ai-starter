import React from "react";
import { ChatCompletionRequestMessage } from "openai";
import ChatBubbleList from "@/components/molecules/ChatBubbleList";

type Props = {
  messages: ChatCompletionRequestMessage[];
  onMessageSend?: (message: string) => void;
};

export const ServerChat: React.FC<Props> = ({ messages, onMessageSend }) => (
  <div className="w-full h-full flex flex-col justify-end">
    <ChatBubbleList messages={messages} />
    <form
      onSubmit={event => {
        event.preventDefault();
        const input = event.currentTarget.elements.namedItem("new") as HTMLInputElement;
        if (input.value && onMessageSend) {
          onMessageSend(input.value);
        }
        input.value = "";
      }}
      className="flex justify-between items-center"
    >
      <input
        id="new"
        name="new"
        type="text"
        placeholder="Describe your rule change here..."
        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg mr-2"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Send
      </button>
    </form>
  </div>
);

export default ServerChat;