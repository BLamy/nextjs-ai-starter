jsx;
import React from "react";
import { Meta } from "@storybook/react";
import { BasicInput, BasicInputProps } from "../components/BasicInput";

export default {
  title: "Components/BasicInput",
  component: BasicInput,
  argTypes: {
    placeholder: {
      control: { type: "text" },
    },
  },
} as Meta;

const Template: Story<BasicInputProps> = (args) => <BasicInput {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  placeholder: "Enter text here",
};
