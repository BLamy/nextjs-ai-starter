import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import ControlledSearchbox, {
  ControlledSearchboxProps,
} from "../ControlledSearchbox";

export default {
  title: "Components/ControlledSearchbox",
  component: ControlledSearchbox,
} as Meta;

const Template: Story<ControlledSearchboxProps> = (args) => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <ControlledSearchbox {...args} value={value} onChange={handleChange} />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search...",
};
