typescript;
import React from "react";
import { Meta, Story } from "@storybook/react";
import SearchBox, { SearchBoxProps } from "../SearchBox";

export default {
  title: "Components/SearchBox",
  component: SearchBox,
  argTypes: {
    onSearch: { action: "searched" },
  },
} as Meta;

const Template: Story<SearchBoxProps> = (args) => <SearchBox {...args} />;

export const Default = Template.bind({});
Default.args = {};
