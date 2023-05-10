import React from "react";
import { Story, Meta } from "@storybook/react";
import TextInput, { TextInputProps } from "../TextInput";

export default {
  title: "Components/TextInput",
  component: TextInput,
} as Meta;

const Template: Story<TextInputProps> = (args) => <TextInput {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Username",
  value: "",
  onChange: () => {},
  placeholder: "Enter your username",
};
