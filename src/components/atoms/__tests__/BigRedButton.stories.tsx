import React from "react";
import { Story, Meta } from "@storybook/react";
import BigRedButton, { BigRedButtonProps } from "../components/BigRedButton";

export default {
  title: "Buttons/BigRedButton",
  component: BigRedButton,
  argTypes: {
    onClick: { action: "clicked" },
  },
} as Meta;

const Template: Story<BigRedButtonProps> = (args) => <BigRedButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClick: () => console.log("Button clicked!"),
};
