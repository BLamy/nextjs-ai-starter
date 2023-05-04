jsx;
// Import the required dependencies
import React from "react";
import { Meta, Story } from "@storybook/react";

// Import the component and its props
import InputBox, { InputBoxProps } from "../InputBox";

// Define the metadata for the storybook
export default {
  title: "Components/InputBox",
  component: InputBox,
} as Meta;

// Define a Template for the story
const Template: Story<InputBoxProps> = (args) => <InputBox {...args} />;

// Define stories with different arguments
export const Basic = Template.bind({});
Basic.args = {};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  placeholder: "Enter text here",
};
