import { render, screen } from '@testing-library/react';
import Hero from './hero';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
  },
}));

// Mock Next.js Link
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ArrowDown: () => <div data-testid="arrow-down-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
}));

describe('Hero', () => {
  it('renders the hero section with correct content', () => {
    render(<Hero />);

    expect(screen.getByText("Hello, I'm")).toBeInTheDocument();
    expect(screen.getByText('Agustin Cassani')).toBeInTheDocument();
    expect(screen.getByText('Full Stack JavaScript Developer & Technical Lead')).toBeInTheDocument();
    expect(screen.getByText(/With 17\+ years of experience/)).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<Hero />);

    const contactButton = screen.getByRole('link', { name: /contact me/i });
    const resumeButton = screen.getByRole('link', { name: /view my resume/i });

    expect(contactButton).toBeInTheDocument();
    expect(contactButton).toHaveAttribute('href', '/#contact');
    expect(resumeButton).toBeInTheDocument();
    expect(resumeButton).toHaveAttribute('href', '/resume');
  });

  it('renders icons correctly', () => {
    render(<Hero />);

    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-down-icon')).toBeInTheDocument();
  });

  it('has correct section id for navigation', () => {
    const { container } = render(<Hero />);
    const section = container.querySelector('section');

    expect(section).toHaveAttribute('id', 'home');
  });

  it('applies correct styling classes', () => {
    const { container } = render(<Hero />);
    const section = container.querySelector('section');

    expect(section).toHaveClass('relative', 'h-screen', 'flex', 'items-center', 'justify-center', 'overflow-hidden');
  });

  it('renders background elements', () => {
    const { container } = render(<Hero />);

    // Check for background gradient
    const gradient = container.querySelector('.bg-gradient-to-br');
    expect(gradient).toBeInTheDocument();

    // Check for animated blob elements
    const blobs = container.querySelectorAll('.animate-blob');
    expect(blobs).toHaveLength(3);
  });

  it('sets visibility state on mount', () => {
    render(<Hero />);
    // Component should render without errors and show content
    expect(screen.getByText('Agustin Cassani')).toBeInTheDocument();
  });

  it('handles prefers-reduced-motion detection error', () => {
    const originalMatchMedia = window.matchMedia;

    // Mock matchMedia to throw an error
    window.matchMedia = jest.fn(() => {
      throw new Error('matchMedia error');
    });

    render(<Hero />);

    // Should render without errors
    expect(screen.getByText('Agustin Cassani')).toBeInTheDocument();

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

    render(<Hero />);

    // Should render without errors and set the state
    expect(screen.getByText('Agustin Cassani')).toBeInTheDocument();

    // Restore original
    window.matchMedia = originalMatchMedia;
  });
});