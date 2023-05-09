import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Avatar, { AvatarProps } from "../Avatar";

export default {
  title: "Example/Avatar",
  component: Avatar,
  argTypes: {
    name: {
      description: "The name to display",
      defaultValue: "Brett Lamy",
      control: "text",
    },
    size: {
      description: "The size of the avatar",
      defaultValue: "medium",
      control: {
        type: "select",
        options: ["small", "medium", "large", "xlarge"],
      },
    },
    className: {
      description: "The class name to apply to the avatar",
      defaultValue: "",
      control: "text",
    },
  },
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "Brett Lamy",
};

export const Large = Template.bind({});
Large.args = {
  name: "Brett Lamy",
  size: "large",
};

export const Small = Template.bind({});
Small.args = {
  name: "Brett Lamy",
  size: "small",
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  name: "Brett Lamy",
  size: "xlarge",
};

export const WithClassName = Template.bind({});
WithClassName.args = {
  name: "Brett Lamy",
  className: "bg-red-500",
};
