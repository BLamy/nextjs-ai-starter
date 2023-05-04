import React from "react";
import { Story, Meta } from "@storybook/react";
import Pitbull, { PitbullProps } from "../Pitbull";

export default {
  title: "Example/Pitbull",
  component: Pitbull,
  argTypes: {
    color: { control: "color" },
    width: {
      control: { type: "range", min: 100, max: 500, step: 1 },
    },
    height: {
      control: { type: "range", min: 100, max: 500, step: 1 },
    },
  },
} as Meta;

const Template: Story<PitbullProps> = (args) => <Pitbull {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: 200,
  height: 200,
  color: "#000000",
};
