import { render, screen } from '@testing-library/react';
import { Label } from './label';

// Mock Radix UI Label
jest.mock('@radix-ui/react-label', () => {
  const MockedRoot = ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <label {...props}>{children}</label>;
  MockedRoot.displayName = 'Label';

  return {
    Root: MockedRoot,
  };
});

describe('Label', () => {
  it('renders label with default classes', () => {
    render(<Label data-testid="label">Label text</Label>);

    const label = screen.getByTestId('label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass(
      'text-sm',
      'font-medium',
      'leading-none',
      'peer-disabled:cursor-not-allowed',
      'peer-disabled:opacity-70'
    );
  });

  it('applies custom className', () => {
    render(<Label className="custom-class" data-testid="label">Custom Label</Label>);

    const label = screen.getByTestId('label');
    expect(label).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Label ref={ref} data-testid="label">Ref Label</Label>);

    expect(ref).toHaveBeenCalled();
  });

  it('passes through other HTML attributes', () => {
    render(
      <Label
        data-testid="label"
        htmlFor="input-id"
        aria-label="Custom aria label"
      >
        Form Label
      </Label>
    );

    const label = screen.getByTestId('label');
    expect(label).toHaveAttribute('for', 'input-id');
    expect(label).toHaveAttribute('aria-label', 'Custom aria label');
  });

  it('renders text content correctly', () => {
    render(<Label data-testid="label">Test Label Content</Label>);

    const label = screen.getByTestId('label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Test Label Content');
  });

  it('has correct display name', () => {
    expect(Label.displayName).toBe('Label');
  });
});