import React from "react";
import { Story, Meta } from "@storybook/react";
import ControlledInput, { ControlledInputProps } from "../ControlledInput";

export default {
  title: "Components/ControlledInput",
  component: ControlledInput,
} as Meta;

const Template: Story<ControlledInputProps> = (args) => (
  <ControlledInput {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: "",
  onChange: (event) => {},
};
