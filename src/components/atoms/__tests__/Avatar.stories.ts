import type { Meta, StoryObj } from '@storybook/react';

import Avatar from '../Avatar';

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
    className: {
        description: 'The class name to apply to the avatar',
        defaultValue: '',
        control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    name: 'Brett Lamy',
  },
};

export const Large: Story = {
  args: {
    name: 'Brett Lamy',
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    name: 'Brett Lamy',
    size: 'small',
  },
};

export const WithClassName: Story = {
  args: {
    name: 'Brett Lamy',
    className: 'bg-red-500',
  },
};