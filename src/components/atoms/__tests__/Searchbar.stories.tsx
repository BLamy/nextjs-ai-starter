import React from "react";
import { Story, Meta } from "@storybook/react";
import Searchbar, { SearchbarProps } from "./Searchbar";

export default {
  title: "Searchbar",
  component: Searchbar,
} as Meta;

const Template: Story<SearchbarProps> = (args) => <Searchbar {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "Search a keyword",
};

export const OnChange = Template.bind({});
OnChange.args = {
  onChange: (value: string) => console.log("search for: ", value),
};
