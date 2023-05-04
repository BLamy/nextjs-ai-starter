import React from "react";
import { Story, Meta } from "@storybook/react";

import LargeLabel, { LargeLabelProps } from "../LargeLabel";

export default {
  title: "Components/LargeLabel",
  component: LargeLabel,
} as Meta;

const Template: Story<LargeLabelProps> = (args) => <LargeLabel {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Large Label Component",
};
