import { Story, Meta } from "@storybook/react";
import ControlledSearchbox, {
  ControlledSearchboxProps,
} from "../ControlledSearchbox";

export default {
  title: "Components/ControlledSearchbox",
  component: ControlledSearchbox,
  argTypes: {
    value: {
      control: false,
    },
    onChange: {
      control: false,
    },
    placeholder: {
      control: "text",
    },
  },
} as Meta;

const Template: Story<ControlledSearchboxProps> = (args) => (
  <ControlledSearchbox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: "",
  placeholder: "Search...",
  onChange: () => {},
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: "React",
  placeholder: "Search...",
  onChange: () => {},
};
