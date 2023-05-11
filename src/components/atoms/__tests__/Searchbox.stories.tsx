import { Meta, Story } from "@storybook/react";
import Searchbox, { SearchboxProps } from "../Searchbox";

export default {
  title: "Searchbox",
  component: Searchbox,
} as Meta;

const Template: Story<SearchboxProps> = (args) => <Searchbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: "",
  onChange: () => {},
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  value: "",
  onChange: () => {},
  placeholder: "Type here to search",
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: "Search query",
  onChange: () => {},
};
