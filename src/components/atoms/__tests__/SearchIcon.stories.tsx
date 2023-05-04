import React from "react";
import { Story, Meta } from "@storybook/react";
import SearchIcon, { SearchIconProps } from "../SearchIcon";

export default {
  title: "Components/SearchIcon",
  component: SearchIcon,
  argTypes: {
    size: {
      control: "number",
    },
    color: {
      control: "color",
    },
  },
} as Meta;

const Template: Story<SearchIconProps> = (args) => <SearchIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Large = Template.bind({});
Large.args = {
  size: 48,
};

export const Colored = Template.bind({});
Colored.args = {
  color: "#FBBF24",
};

export const Clickable = Template.bind({});
Clickable.args = {
  onClick: () => alert("Search clicked!"),
};
