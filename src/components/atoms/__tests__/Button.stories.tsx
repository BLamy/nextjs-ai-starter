import React from "react";
import { Story, Meta } from "@storybook/react";
import Button, { ButtonProps } from "../Button";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    color: {
      control: "select",
      options: [
        "red",
        "blue",
        "green",
        "yellow",
        "orange",
        "teal",
        "purple",
        "pink",
      ],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Button",
};

export const RedLarge = Template.bind({});
RedLarge.args = {
  color: "red",
  size: "lg",
  children: "Button",
};

export const YellowDisabled = Template.bind({});
YellowDisabled.args = {
  color: "yellow",
  disabled: true,
  children: "Button",
};
