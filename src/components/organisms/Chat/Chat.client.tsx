"use client";
import React, { useRef, useEffect, useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import ChatBubbleList from "@/components/molecules/ChatBubbleList";
import { WindowAI, getWindowAI } from "window.ai";
import Button from "@/components/atoms/Button";
import { assistant, user } from "@/lib/ChatCompletion";

export const EXTENSION_CHROME_URL =
  "https://chrome.google.com/webstore/detail/window-ai/cbhbgmdpcoelfdoihppookkijpmgahag";

type Props = {
  defaultMessages: ChatCompletionRequestMessage[];
};

export const ClientChat: React.FC<Props> = ({ defaultMessages }) => {
  const [messages, setMessages] =
    useState<ChatCompletionRequestMessage[]>(defaultMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const windowAIRef = useRef<WindowAI>();
  const [showInstallMessage, setShowInstallMessage] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    getWindowAI()
      .then((windowAI) => {
        windowAIRef.current = windowAI;
      })
      .catch((err) => {
        setShowInstallMessage(true);
      });
  }, []);

  // when new message get set to an empty string (after sending), disable the send button for 5 seconds
  useEffect(() => {
    if (newMessage === "") {
      if (sendButtonRef.current) {
        sendButtonRef.current.disabled = true;
        setTimeout(() => {
          if (sendButtonRef.current) {
            sendButtonRef.current.disabled = false;
          }
        }, 5000);
      }
    }
  }, [newMessage]);

  const handleNewMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewMessage(event.target.value);
  };

  const handleNewMessageSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (newMessage) {
      console.log(newMessage);
      // Get the active model from the window.ai API
      console.log(await window.ai.getCurrentModel());

      // Get completions from the window.ai API
      const msg = user(newMessage);
      setMessages((value) => [...value, msg]);
      setNewMessage("");
      try {
        await window.ai.getCompletion(
          {
            messages: [...messages, msg],
          },
          {
            onStreamResult: (result: any, error: any) => {
              setMessages((messages) => {
                if (messages[messages.length - 1].role === "assistant") {
                  return [
                    ...messages.slice(0, messages.length - 1),
                    assistant(
                      messages[messages.length - 1].content +
                        result.message.content
                    ),
                  ];
                } else {
                  return [...messages, assistant(result.message.content)];
                }
              });
            },
          }
        );
      } catch (e) {
        console.error(e);

        setMessages([
          ...messages,
          assistant("Sorry, I had an error. Please try again later."),
        ]);
      }
    }
  };

  if (showInstallMessage) {
    return (
      <div className="w-full h-full flex flex-col justify-end">
        <ChatBubbleList messages={messages} />
        <div className="flex gap-2 text-sm">
          <p className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg mr-2 text-center text-white text-base flex items-center">
            Continue this conversation using window.ai!
          </p>
          <div className="grid">
            <Button
              onClick={() => window.open(EXTENSION_CHROME_URL, "_blank")}
              className=" bg-indigo-600 hover:bg-indigo-500 "
              text="Get the extension"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-end">
      <ChatBubbleList messages={messages} />
      <form
        onSubmit={handleNewMessageSubmit}
        className="flex justify-between items-center"
      >
        <input
          id="new"
          name="new"
          type="text"
          placeholder="Message"
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg mr-2"
          value={newMessage}
          onChange={handleNewMessageChange}
          ref={inputRef}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          ref={sendButtonRef}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ClientChat;
