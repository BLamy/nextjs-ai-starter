import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Token, { TokenProps } from "../Token";

export default {
  title: "Components/Token",
  component: Token,
} as ComponentMeta<typeof Token>;

const Template: ComponentStory<typeof Token> = (args) => <Token {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const CustomColor = Template.bind({});
CustomColor.args = {
  color: "bg-red-500",
};
