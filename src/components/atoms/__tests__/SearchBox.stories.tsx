import { Story, Meta } from "@storybook/react";
import SearchBox, { SearchBoxProps } from "../SearchBox";

export default {
  title: "Example/SearchBox",
  component: SearchBox,
} as Meta;

const Template: Story<SearchBoxProps> = (args) => <SearchBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  onChange: (value) => {
    console.log(value);
  },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  onChange: (value) => {
    console.log(value);
  },
};
