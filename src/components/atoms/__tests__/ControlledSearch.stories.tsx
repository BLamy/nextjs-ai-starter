import { useState } from "react";
import { Story, Meta } from "@storybook/react";
import ControlledSearch, { ControlledSearchProps } from "../ControlledSearch";

export default {
  title: "Components/ControlledSearch",
  component: ControlledSearch,
} as Meta;

const Template: Story<ControlledSearchProps> = (args) => {
  const [value, setValue] = useState("");
  return <ControlledSearch {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search",
  className: "",
};
