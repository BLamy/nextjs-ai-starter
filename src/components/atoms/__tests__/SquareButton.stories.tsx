import React from "react";
import { Meta, Story } from "@storybook/react";
import SquareButton, { SquareButtonProps } from "../SquareButton";

export default {
  title: "SquareButton",
  component: SquareButton,
} as Meta;

const Template: Story<SquareButtonProps> = (args) => <SquareButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: "Click me",
};
