import React from "react";
import { Story, Meta } from "@storybook/react";
import ControlledSearchBox, {
  ControlledSearchBoxProps,
} from "../ControlledSearchBox";

export default {
  title: "Components/ControlledSearchBox",
  component: ControlledSearchBox,
} as Meta;

const Template: Story<ControlledSearchBoxProps> = (args) => (
  <ControlledSearchBox {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  value: "",
  onChange: (searchText: string) => console.log(searchText),
};
