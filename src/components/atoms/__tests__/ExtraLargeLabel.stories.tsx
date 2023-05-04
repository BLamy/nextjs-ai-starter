import React from "react";
import { Meta, Story } from "@storybook/react";
import ExtraLargeLabel, { ExtraLargeLabelProps } from "../ExtraLargeLabel";

export default {
  title: "Components/Extra Large Label",
  component: ExtraLargeLabel,
} as Meta;

const Template: Story<ExtraLargeLabelProps> = (args) => (
  <ExtraLargeLabel {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Example Extra Large Label",
};
