import React from "react";
import { Meta, Story } from "@storybook/react";
import Search, { SearchProps } from "../Search";

export default {
  title: "UI/Search",
  component: Search,
} as Meta;

const Template: Story<SearchProps> = (args) => <Search {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: "",
  onChange: (value: string) => console.log(value),
};
