import React from "react";
import { Meta, Story } from "@storybook/react";
import Search, { SearchProps } from "../Search";

export default {
  title: "UI/SearchBar",
  component: SearchBar,
} as Meta;

const Template: Story<SearchBarProps> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSearch: (searchTerm: string) => console.log(searchTerm),
};
