import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import InputBox, { InputBoxProps } from "../InputBox";

export default {
  title: "Example/InputBox",
  component: InputBox,
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
} as ComponentMeta<typeof InputBox>;

const Template: ComponentStory<typeof InputBox> = (args) => (
  <InputBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "Enter your name",
};
