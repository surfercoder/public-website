import { render } from '@testing-library/react';
import { useTheme } from 'next-themes';
import { Toaster } from './sonner';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

// Mock sonner
jest.mock('sonner', () => ({
  Toaster: ({ theme, className, style, position, richColors, ...props }: { theme?: string; className?: string; style?: React.CSSProperties; position?: string; richColors?: boolean; [key: string]: unknown }) => (
    <div
      data-testid="sonner-toaster"
      data-theme={theme}
      data-position={position}
      data-rich-colors={richColors}
      className={className}
      style={style}
      {...props}
    />
  ),
}));

const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe('Toaster', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders toaster with theme from useTheme', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: jest.fn(),
      resolvedTheme: 'dark',
      systemTheme: 'dark',
      themes: ['light', 'dark'],
      forcedTheme: undefined,
    });

    const { getByTestId } = render(<Toaster />);

    const toaster = getByTestId('sonner-toaster');
    expect(toaster).toBeInTheDocument();
    expect(toaster).toHaveAttribute('data-theme', 'dark');
    expect(toaster).toHaveClass('toaster', 'group');
  });

  it('uses system theme as default when theme is undefined', () => {
    mockUseTheme.mockReturnValue({
      theme: undefined,
      setTheme: jest.fn(),
      resolvedTheme: 'light',
      systemTheme: 'light',
      themes: ['light', 'dark'],
      forcedTheme: undefined,
    });

    const { getByTestId } = render(<Toaster />);

    const toaster = getByTestId('sonner-toaster');
    expect(toaster).toHaveAttribute('data-theme', 'system');
  });

  it('applies custom CSS properties', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: jest.fn(),
      resolvedTheme: 'light',
      systemTheme: 'light',
      themes: ['light', 'dark'],
      forcedTheme: undefined,
    });

    const { getByTestId } = render(<Toaster />);

    const toaster = getByTestId('sonner-toaster');
    const style = toaster.style;

    expect(style.getPropertyValue('--normal-bg')).toBe('var(--popover)');
    expect(style.getPropertyValue('--normal-text')).toBe('var(--popover-foreground)');
    expect(style.getPropertyValue('--normal-border')).toBe('var(--border)');
  });

  it('passes through additional props', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: jest.fn(),
      resolvedTheme: 'light',
      systemTheme: 'light',
      themes: ['light', 'dark'],
      forcedTheme: undefined,
    });

    const { getByTestId } = render(
      <Toaster position="top-right" richColors />
    );

    const toaster = getByTestId('sonner-toaster');
    expect(toaster).toHaveAttribute('data-position', 'top-right');
    expect(toaster).toHaveAttribute('data-rich-colors', 'true');
  });

  it('works with different theme values', () => {
    const { rerender, getByTestId } = render(<Toaster />);

    // Test light theme
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: jest.fn(),
      resolvedTheme: 'light',
      systemTheme: 'light',
      themes: ['light', 'dark'],
      forcedTheme: undefined,
    });
    rerender(<Toaster />);
    expect(getByTestId('sonner-toaster')).toHaveAttribute('data-theme', 'light');

    // Test dark theme
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: jest.fn(),
      resolvedTheme: 'dark',
      systemTheme: 'dark',
      themes: ['light', 'dark'],
      forcedTheme: undefined,
    });
    rerender(<Toaster />);
    expect(getByTestId('sonner-toaster')).toHaveAttribute('data-theme', 'dark');
  });
});