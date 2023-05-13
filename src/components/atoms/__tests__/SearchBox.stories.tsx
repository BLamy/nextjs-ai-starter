import React from "react";
import { Meta, Story } from "@storybook/react";
import SearchBox, { SearchBoxProps } from "../components/SearchBox/SearchBox";

export default {
  component: SearchBox,
  title: "Components/SearchBox",
} as Meta;

const Template: Story<SearchBoxProps> = (args) => <SearchBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search",
  onSearch: (value: string) => console.log(`Searching for: ${value}`),
};
