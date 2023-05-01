import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '../components/Avatar';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Avatar> = {
  title: 'Example/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    name: {
        description: 'The name to display',
        defaultValue: 'Brett Lamy',
        control: 'text',
    },
    size: {
        description: 'The size of the avatar',
        defaultValue: 'medium',
        control: 'select',
        options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    name: 'Brett Lamy',
  },
};

export const Secondary: Story = {
  args: {
    name: 'Test 123',
  },
};

export const Large: Story = {
  args: {
    name: 'Avatar',
  },
};

export const Small: Story = {
  args: {
    name: 'Avatar',
  },
};
