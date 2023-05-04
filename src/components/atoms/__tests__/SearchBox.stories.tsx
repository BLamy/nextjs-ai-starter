import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import SearchBox, { SearchBoxProps } from "../SearchBox";

export default {
  title: "Components/SearchBox",
  component: SearchBox,
  argTypes: {
    onSearch: { action: "search" },
  },
} as Meta;

const Template: Story<SearchBoxProps> = (args) => <SearchBox {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholder: "Custom Placeholder",
};
