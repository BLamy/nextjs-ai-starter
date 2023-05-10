import React from "react";
import { Story, Meta } from "@storybook/react";
import SearchComponent, { SearchComponentProps } from "../SearchComponent";

export default {
  title: "SearchComponent",
  component: SearchComponent,
} as Meta;

const Template: Story<SearchComponentProps> = (args) => (
  <SearchComponent {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const WithValue = Template.bind({});
WithValue.args = {
  value: "Hello World",
  onChange: (value) => console.log(value),
};
