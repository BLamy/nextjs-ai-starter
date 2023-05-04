import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import SearchIcon, { SearchIconProps } from "../components/SearchIcon";

export default {
  title: "Component/SearchIcon",
  component: SearchIcon,
  argTypes: {
    size: {
      defaultValue: 24,
      control: { type: "range", min: 16, max: 48, step: 1 },
    },
    color: {
      defaultValue: "#000",
      control: { type: "color" },
    },
  },
} as Meta;

const Template: Story<SearchIconProps> = (args) => <SearchIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
