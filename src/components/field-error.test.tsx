import { render, screen } from '@testing-library/react';
import FieldError from './field-error';
import { ActionState } from '@/lib/utils';

describe('FieldError', () => {
  const mockActionState: ActionState = {
    fieldErrors: {
      email: ['Email is required'],
      name: ['Name must be at least 2 characters'],
    },
    message: '',
  };

  it('renders error message when field has errors', () => {
    render(<FieldError actionState={mockActionState} name="email" />);

    const errorElement = screen.getByTestId('field-error');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent('Email is required');
    expect(errorElement).toHaveClass('text-red-500', 'text-xs');
  });

  it('renders first error when field has multiple errors', () => {
    const actionStateWithMultipleErrors: ActionState = {
      fieldErrors: {
        email: ['Email is required', 'Email is invalid'],
      },
      message: '',
    };

    render(<FieldError actionState={actionStateWithMultipleErrors} name="email" />);

    const errorElement = screen.getByTestId('field-error');
    expect(errorElement).toHaveTextContent('Email is required');
  });

  it('does not render when field has no errors', () => {
    render(<FieldError actionState={mockActionState} name="nonexistent" />);

    expect(screen.queryByTestId('field-error')).not.toBeInTheDocument();
  });

  it('does not render when actionState is null', () => {
    render(<FieldError actionState={null} name="email" />);

    expect(screen.queryByTestId('field-error')).not.toBeInTheDocument();
  });

  it('does not render when fieldErrors is undefined', () => {
    const actionStateWithoutFieldErrors: ActionState = {
      fieldErrors: {},
      message: 'Some message',
    };

    render(<FieldError actionState={actionStateWithoutFieldErrors} name="email" />);

    expect(screen.queryByTestId('field-error')).not.toBeInTheDocument();
  });

  it('does not render when fieldErrors is empty for the field', () => {
    const actionStateWithEmptyFieldErrors: ActionState = {
      fieldErrors: {
        email: undefined,
      },
      message: '',
    };

    render(<FieldError actionState={actionStateWithEmptyFieldErrors} name="email" />);

    expect(screen.queryByTestId('field-error')).not.toBeInTheDocument();
  });
});