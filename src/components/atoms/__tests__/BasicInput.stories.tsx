import { Story, Meta } from "@storybook/react";
import BasicInput, { BasicInputProps } from "../BasicInput";

export default {
  title: "Components/BasicInput",
  component: BasicInput,
  argTypes: {
    onChange: { action: "change" },
  },
} as Meta;

const Template: Story<BasicInputProps> = (args) => <BasicInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Enter text here",
};
