import { render, screen, fireEvent } from '@testing-library/react';
import { useTheme } from 'next-themes';
import ThemeToggle from './theme-toggle';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Moon: () => <div data-testid="moon-icon" />,
  Sun: () => <div data-testid="sun-icon" />,
}));

const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe('ThemeToggle', () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
      systemTheme: 'light',
      themes: ['light', 'dark'],
      forcedTheme: undefined,
    });
  });

  it('renders toggle button with correct attributes', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(button).toHaveClass('rounded-full');
  });

  it('shows sun icon for light theme', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
      systemTheme: 'light',
      themes: ['light', 'dark'],
      forcedTheme: undefined,
    });

    render(<ThemeToggle />);

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
  });

  it('shows moon icon for dark theme', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
      systemTheme: 'dark',
      themes: ['light', 'dark'],
      forcedTheme: undefined,
    });

    render(<ThemeToggle />);

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument();
  });

  it('toggles from light to dark theme when clicked', () => {
    mockUseTheme.mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
      systemTheme: 'light',
      themes: ['light', 'dark'],
      forcedTheme: undefined,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('toggles from dark to light theme when clicked', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
      systemTheme: 'dark',
      themes: ['light', 'dark'],
      forcedTheme: undefined,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('uses resolvedTheme when theme is undefined', () => {
    mockUseTheme.mockReturnValue({
      theme: undefined,
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
      systemTheme: 'dark',
      themes: ['light', 'dark'],
      forcedTheme: undefined,
    });

    render(<ThemeToggle />);

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('shows correct aria-label for dark theme', () => {
    mockUseTheme.mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
      systemTheme: 'dark',
      themes: ['light', 'dark'],
      forcedTheme: undefined,
    });

    render(<ThemeToggle />);

    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light mode');
  });
});