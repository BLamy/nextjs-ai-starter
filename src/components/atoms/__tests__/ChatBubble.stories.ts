import type { Meta, StoryObj } from '@storybook/react';

import ChatBubble from '../ChatBubble';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ChatBubble> = {
  title: 'Example/ChatBubble',
  component: ChatBubble,
  tags: ['autodocs'],
  argTypes: {
    role: {
        description: 'The role of the chat bubble',
        defaultValue: 'user',
        control: 'enum',
        options: ['user', 'assistant', 'system'],
    },
    content: {
        description: 'The text to display',
        defaultValue: 'Hello World!',
        control: 'text',
    },
    
  },
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DefaultBubble: Story = {
  args: {
    content: 'Hello World!',
  },
};

export const AssistantBubble: Story = {
  args: {
    content: 'Hello World!',
    role: 'assistant',
  },
};

export const UserBubble: Story = {
  args: {
    content: 'Hello World!',
    role: 'user',
  },
};

export const SystemBubble: Story = {
  args: {
    content: 'Hello World!',
    role: 'system',
  },
};
