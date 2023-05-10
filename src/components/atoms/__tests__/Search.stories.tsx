import React from "react";
import { Story, Meta } from "@storybook/react";
import Search, { SearchProps } from "../Search";

export default {
  title: "Components/Search",
  component: Search,
} as Meta;

const Template: Story<SearchProps> = (args) => <Search {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: "",
  onChange: () => {},
};
