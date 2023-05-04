import SearchIcon, { SearchIconProps } from "../SearchIcon";

import React from "react";
import { Story, Meta } from "@storybook/react";
import { SearchIcon, SearchIconProps } from "./SearchIcon";

export default {
  title: "Components/SearchIcon",
  component: SearchIcon,
} as Meta;

const Template: Story<SearchIconProps> = (args) => <SearchIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithCustomColor = Template.bind({});
WithCustomColor.args = {
  strokeColor: "#ff0000",
};

export const WithCustomStrokeWidth = Template.bind({});
WithCustomStrokeWidth.args = {
  strokeWidth: 4,
};

export const WithCustomSize = Template.bind({});
WithCustomSize.args = {
  size: 32,
};
