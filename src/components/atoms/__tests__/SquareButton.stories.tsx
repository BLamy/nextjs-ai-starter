import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import SquareButton, { SquareButtonProps } from "../SquareButton";

export default {
  title: "Components/SquareButton",
  component: SquareButton,
} as Meta;

const Template: Story<SquareButtonProps> = (args) => <SquareButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Button", // the text you want to show inside the button
};
