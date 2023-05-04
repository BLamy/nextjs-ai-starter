// LargeLabel.stories.tsx

import React from "react";
import { Story, Meta } from "@storybook/react";
import LargeLabel, {
  LargeLabelProps,
} from "../components/LargeLabel/LargeLabel";

export default {
  title: "Components/Large Label",
  component: LargeLabel,
} as Meta;

const Template: Story<LargeLabelProps> = (args) => <LargeLabel {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "Hello, world!",
};
