import React from "react";
import { Story, Meta } from "@storybook/react";

import Label, { LabelProps } from "../Label";

export default {
  title: "Components/Label",
  component: Label,
} as Meta;

const Template: Story<LabelProps> = (args) => <Label {...args} />;

export const LargeLabel = Template.bind({});
LargeLabel.args = {
  text: "Example Text",
};
