import React from "react";
import ControlledSearchbox, {
  ControlledSearchboxProps,
} from "../ControlledSearchbox";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Components/ControlledSearchbox",
  component: ControlledSearchbox,
  argTypes: {
    value: {
      control: null,
    },
    onChange: {
      action: "changed",
    },
    placeholder: {
      control: {
        type: "text",
      },
      defaultValue: "Search",
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: Story<ControlledSearchboxProps> = (args) => {
  const [value, setValue] = React.useState("");
  const handleChange = (newValue: string) => setValue(newValue);

  return (
    <ControlledSearchbox {...args} value={value} onChange={handleChange} />
  );
};

export const Default = Template.bind({});
Default.args = {};
