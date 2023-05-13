import React from "react";
import { Story, Meta } from "@storybook/react";
import ControlledSearchbox, {
  ControlledSearchboxProps,
} from "../ControlledSearchbox";

export default {
  title: "Components/ControlledSearchbox",
  component: ControlledSearchbox,
} as Meta;

const Template: Story<ControlledSearchboxProps> = (args) => (
  <ControlledSearchbox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: "",
  onChange: () => {},
};
