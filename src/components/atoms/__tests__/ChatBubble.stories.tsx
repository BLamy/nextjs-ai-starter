import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import ChatBubble, { ChatBubbleProps } from "../ChatBubble";

export default {
  title: "Example/ChatBubble",
  component: ChatBubble,
  argTypes: {
    role: {
      description: "The role of the chat bubble",
      defaultValue: "user",
      control: {
        type: "select",
        options: ["user", "assistant", "system"],
      },
    },
    content: {
      description: "The text to display",
      defaultValue: "Hello World!",
      control: "text",
    },
  },
} as Meta;

const Template: Story<ChatBubbleProps> = (args) => <ChatBubble {...args} />;

export const DefaultBubble = Template.bind({});
DefaultBubble.args = {
  content: "Hello World!",
};

export const AssistantBubble = Template.bind({});
AssistantBubble.args = {
  content: "Hello World!",
  role: "assistant",
};

export const UserBubble = Template.bind({});
UserBubble.args = {
  content: "Hello World!",
  role: "user",
};

export const SystemBubble = Template.bind({});
SystemBubble.args = {
  content: "Hello World!",
  role: "system",
};
