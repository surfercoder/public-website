import { render, screen } from '@testing-library/react';
import Hero from './hero';

jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

jest.mock('lucide-react', () => ({
  ArrowDown: () => <div data-testid="arrow-down-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
}));

describe('Hero', () => {
  it('renders the hero section with correct content', () => {
    render(<Hero />);

    expect(screen.getByText("Hello, I'm")).toBeInTheDocument();
    expect(screen.getByText('Agustin Cassani')).toBeInTheDocument();
    expect(screen.getByText('Senior Software Engineer & Technical Leader')).toBeInTheDocument();
    expect(screen.getByText(/With 18\+ years of experience/)).toBeInTheDocument();
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

  it('renders the background gradient', () => {
    const { container } = render(<Hero />);

    const gradient = container.querySelector('.bg-gradient-to-br');
    expect(gradient).toBeInTheDocument();
  });

  it('does not render the un-animated blob decorations', () => {
    const { container } = render(<Hero />);

    expect(container.querySelectorAll('.animate-blob')).toHaveLength(0);
  });
});
