import React from "react";
import { action } from "@storybook/addon-actions";

import InputBox, { InputBoxProps } from "../InputBox";

export default {
  title: "InputBox",
  component: InputBox,
};

const Template: Story<InputBoxProps> = (args) => <InputBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: "",
  onChange: action("onChange"),
};
