import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SquareButton, { SquareButtonProps } from "../components/SquareButton";

export default {
  title: "Example/SquareButton",
  component: SquareButton,
} as ComponentMeta<typeof SquareButton>;

const Template: ComponentStory<typeof SquareButton> = (args) => (
  <SquareButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: "Click me!",
} as SquareButtonProps;
