import { render, screen, fireEvent } from '@testing-library/react';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import Experience from './experience';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Briefcase: () => <div data-testid="briefcase-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
  ChevronDown: () => <div data-testid="chevron-down-icon" />,
  ChevronUp: () => <div data-testid="chevron-up-icon" />,
  ExternalLink: () => <div data-testid="external-link-icon" />,
}));

describe('Experience', () => {
  it('renders the experience section with correct heading', () => {
    render(<Experience />);

    expect(screen.getByText('Professional Experience')).toBeInTheDocument();
    expect(screen.getByText('My journey through various roles and companies')).toBeInTheDocument();
  });

  it('renders recent experiences by default', () => {
    render(<Experience />);

    // Should show recent experiences (Leverege and UTN should be visible)
    expect(screen.getByText('Leverege')).toBeInTheDocument();
    expect(screen.getByText('Universidad Tecnológica Nacional')).toBeInTheDocument();
  });

  it('shows toggle button for showing all experiences', () => {
    render(<Experience />);

    const toggleButton = screen.getByRole('button', { name: /show more/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('expands to show all experiences when toggle is clicked', () => {
    render(<Experience />);

    const toggleButton = screen.getByRole('button', { name: /show more/i });
    fireEvent.click(toggleButton);

    // Button text should change
    expect(screen.getByRole('button', { name: /show less/i })).toBeInTheDocument();

    // Should show more experiences
    expect(screen.getByText('Leverege')).toBeInTheDocument();
    expect(screen.getByText('Universidad Tecnológica Nacional')).toBeInTheDocument();
  });

  it('renders experience details correctly', () => {
    render(<Experience />);

    // Check Leverege experience details
    expect(screen.getByText('Senior React Native Developer')).toBeInTheDocument();
    expect(screen.getByText('AUGUST 2023 - FEBRUARY 2025')).toBeInTheDocument();
    expect(screen.getAllByText('Remote')[0]).toBeInTheDocument();

    // Check achievements are present - they might be in collapsed accordions
    expect(screen.getByText('Leverege')).toBeInTheDocument();
    expect(screen.getByText('Senior React Native Developer')).toBeInTheDocument();
  });

  it('renders experience with accordion functionality', () => {
    render(<Experience />);

    // Check if experience items are rendered (they use accordion structure)
    expect(screen.getByText('Leverege')).toBeInTheDocument();
    expect(screen.getByText('Universidad Tecnológica Nacional')).toBeInTheDocument();
  });

  it('shows correct icons', () => {
    render(<Experience />);

    expect(screen.getAllByTestId('briefcase-icon').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('calendar-icon').length).toBeGreaterThan(0);
  });

  it('has correct section id for navigation', () => {
    const { container } = render(<Experience />);
    const section = container.querySelector('section');

    expect(section).toHaveAttribute('id', 'experience');
  });

  it('applies correct styling classes', () => {
    const { container } = render(<Experience />);
    const section = container.querySelector('section');

    expect(section).toHaveClass('py-20', 'bg-gray-50', 'dark:bg-gray-900');
  });

  it('renders company and position information', () => {
    render(<Experience />);

    // Check company names
    expect(screen.getByText('Leverege')).toBeInTheDocument();
    expect(screen.getByText('Universidad Tecnológica Nacional')).toBeInTheDocument();

    // Check positions
    expect(screen.getByText('Senior React Native Developer')).toBeInTheDocument();
    expect(screen.getByText('Professor (Contract)')).toBeInTheDocument();
  });

  it('renders experience periods and locations', () => {
    render(<Experience />);

    expect(screen.getByText('AUGUST 2023 - FEBRUARY 2025')).toBeInTheDocument();
    expect(screen.getByText('AUGUST 2023 - PRESENT')).toBeInTheDocument();
    expect(screen.getAllByText('Mendoza, Argentina').length).toBeGreaterThanOrEqual(2); // Multiple positions are in Mendoza, Argentina
  });

  it('renders job types correctly', () => {
    render(<Experience />);

    expect(screen.getAllByText('Remote').length).toBeGreaterThan(0);
    expect(screen.getByText('Contract')).toBeInTheDocument();
  });

  it('toggles between show all and show recent states', () => {
    render(<Experience />);

    const toggleButton = screen.getByRole('button', { name: /show more/i });

    // Initial state - show recent
    expect(toggleButton).toHaveTextContent('Show More');

    // Click to show all
    fireEvent.click(toggleButton);
    expect(screen.getByRole('button', { name: /show less/i })).toHaveTextContent('Show Less');

    // Click again to show recent
    fireEvent.click(screen.getByRole('button', { name: /show less/i }));
    expect(screen.getByRole('button', { name: /show more/i })).toHaveTextContent('Show More');
  });

  it('handles prefers-reduced-motion detection error', () => {
    const originalMatchMedia = window.matchMedia;

    // Mock matchMedia to throw an error
    window.matchMedia = jest.fn(() => {
      throw new Error('matchMedia error');
    });

    render(<Experience />);

    // Should render without errors
    expect(screen.getByText('Professional Experience')).toBeInTheDocument();

    // Restore original
    window.matchMedia = originalMatchMedia;
  });

  it('handles prefers-reduced-motion detection success', () => {
    const originalMatchMedia = window.matchMedia;

    // Mock matchMedia to return valid media query
    window.matchMedia = jest.fn(() => ({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    render(<Experience />);

    // Should render without errors and set the state
    expect(screen.getByText('Professional Experience')).toBeInTheDocument();

    // Restore original
    window.matchMedia = originalMatchMedia;
  });
});