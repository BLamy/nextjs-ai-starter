import { Story, Meta } from "@storybook/react";
import SearchIcon, { Props } from "../path/to/SearchIcon";

export default {
  title: "Components/SearchIcon",
  component: SearchIcon,
} as Meta;

const Template: Story<Props> = (args) => <SearchIcon {...args} />;

export const BasicSearchIcon = Template.bind({});
BasicSearchIcon.args = {
  onClick: () => alert("Search clicked!"),
  className: "my-custom-styles",
};
