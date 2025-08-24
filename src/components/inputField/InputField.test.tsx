import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';

describe('InputField Component', () => {
  test('renders label and input', () => {
    render(<InputField label="Test Label" placeholder="Type here" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  test('calls onChange when input changes', () => {
    const handleChange = jest.fn();
    render(<InputField label="Test" onChange={handleChange} />);
    const input = screen.getByLabelText('Test');
    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('displays error message when invalid', () => {
    render(<InputField label="Email" invalid errorMessage="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
});
