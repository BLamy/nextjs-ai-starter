import { Story, Meta } from "@storybook/react";
import SearchBox, { SearchBoxProps } from "../SearchBox";

export default {
  title: "SearchBox",
  component: SearchBox,
  argTypes: {
    value: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
  },
} as Meta;

const Template: Story<SearchBoxProps> = (args) => <SearchBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: "",
  placeholder: "Search...",
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: "Hello World",
  placeholder: "Search...",
};
