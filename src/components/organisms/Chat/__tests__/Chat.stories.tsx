import type { Meta, StoryObj } from '@storybook/react';

import ClientChat from '../Chat.client';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof ClientChat> = {
  title: 'Example/ClientChat',
  component: ClientChat,
  tags: ['autodocs'],
  argTypes: {   
    defaultMessages: {
        control: {
            type: 'array',
        }
    }
  },
};

export default meta;
type Story = StoryObj<typeof ClientChat>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DefaultClientChat: Story = {
  args: {
    defaultMessages: [
        {
            role: 'system',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
        },
        {
            role: 'user',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
        },
        {
            role: 'assistant',
            content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
        },
        {
            role: 'assistant',
            content: '{ "error": "this is an error message" }',
        }
    ]
  },
};
