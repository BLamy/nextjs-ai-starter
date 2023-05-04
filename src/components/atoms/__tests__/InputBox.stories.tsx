jsx;
import React from "react";
import { Meta, Story } from "@storybook/react";
import InputBox, { InputBoxProps } from "../components/InputBox";

export default {
  title: "Example/InputBox",
  component: InputBox,
  argTypes: {
    placeholder: { control: "text" },
  },
} as Meta;

const Template: Story<InputBoxProps> = (args) => <InputBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Enter text here",
};
