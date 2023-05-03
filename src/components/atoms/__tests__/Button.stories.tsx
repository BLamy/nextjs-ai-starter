import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button, { ButtonProps } from '../Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    text: {
      description: 'The text to display',
      defaultValue: 'Button',
      control: 'text',
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  text: 'Click Me!',
};
