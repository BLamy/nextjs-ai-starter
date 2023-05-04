import React from "react";
import { Story, Meta } from "@storybook/react";

import SearchIcon, { SearchIconProps } from "../SearchIcon";

export default {
  title: "Components/SearchIcon",
  component: SearchIcon,
  argTypes: {
    className: {
      control: "text",
      description: "Classname of the SVG element",
    },
    onClick: {
      action: "clicked",
      description: "onClick event handler",
    },
  },
} as Meta;

const Template: Story<SearchIconProps> = (args) => <SearchIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithCustomClassname = Template.bind({});
WithCustomClassname.args = {
  className: "text-red-500",
};

export const WithOnClickHandler = Template.bind({});
WithOnClickHandler.args = {
  onClick: () => {
    alert("Icon Clicked!");
  },
};
