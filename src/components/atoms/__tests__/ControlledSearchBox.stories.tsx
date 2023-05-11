import { ComponentStory, ComponentMeta } from "@storybook/react";
import ControlledSearchBox, {
  ControlledSearchBoxProps,
} from "../ControlledSearchBox";

export default {
  title: "Example/ControlledSearchBox",
  component: ControlledSearchBox,
  argTypes: {
    onChange: { action: "changed" },
  },
} as ComponentMeta<typeof ControlledSearchBox>;

const Template: ComponentStory<typeof ControlledSearchBox> = (args) => (
  <ControlledSearchBox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search...",
};
