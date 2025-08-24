import React, { useState } from 'react';
import { Meta, StoryObj } from "@storybook/react-webpack5";

import { InputField, InputFieldProps } from '../components/inputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  }
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    helperText: 'This is a helper text',
    variant: 'outlined',
    size: 'md',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    errorMessage: 'Invalid email address',
    invalid: true,
    variant: 'outlined',
    size: 'md',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    disabled: true,
    variant: 'filled',
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <InputField
        label="Interactive Input"
        placeholder="Type something..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Try typing here"
        variant="ghost"
        size="md"
      />
    );
  },
};
