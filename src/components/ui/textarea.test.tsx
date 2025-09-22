import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders textarea with default classes', () => {
    render(<Textarea data-testid="textarea" placeholder="Enter text" />);

    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass(
      'flex',
      'min-h-[80px]',
      'w-full',
      'rounded-md',
      'border',
      'border-input',
      'bg-background',
      'px-3',
      'py-2'
    );
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-class" data-testid="textarea" />);

    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('custom-class');
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} data-testid="textarea" />);

    const textarea = screen.getByTestId('textarea');
    fireEvent.change(textarea, { target: { value: 'test content' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Textarea disabled data-testid="textarea" />);

    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Textarea ref={ref} data-testid="textarea" />);

    expect(ref).toHaveBeenCalled();
  });

  it('passes through other HTML attributes', () => {
    render(
      <Textarea
        data-testid="textarea"
        placeholder="Test placeholder"
        maxLength={500}
        rows={5}
        required
      />
    );

    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('placeholder', 'Test placeholder');
    expect(textarea).toHaveAttribute('maxLength', '500');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('required');
  });

  it('has correct display name', () => {
    expect(Textarea.displayName).toBe('Textarea');
  });

  it('applies focus styles correctly', () => {
    render(<Textarea data-testid="textarea" />);

    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass(
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2'
    );
  });

  it('applies placeholder styles correctly', () => {
    render(<Textarea data-testid="textarea" />);

    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('placeholder:text-muted-foreground');
  });

  it('has minimum height set', () => {
    render(<Textarea data-testid="textarea" />);

    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('min-h-[80px]');
  });
});