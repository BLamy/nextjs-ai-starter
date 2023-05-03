import type { Meta, StoryObj } from "@storybook/react";

import ChatBubbleList from "../ChatBubbleList";
import { system, user, assistant } from "@/lib/ChatCompletion";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ChatBubbleList> = {
  title: "Example/ChatBubbleList",
  component: ChatBubbleList,
  tags: ["autodocs"],
  argTypes: {
    messages: {
      control: {
        type: "array",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatBubbleList>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DefaultBubbleList: Story = {
  args: {
    messages: [
      system(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s"
      ),
      user(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s"
      ),
      assistant(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s"
      ),
      assistant('{ "error": "this is an error message" }'),
    ],
  },
};
