import { render, screen } from '@testing-library/react';
import Footer from './footer';

// Mock Next.js Link
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';
jest.mock('next/link', () => {
  return function MockLink(
    { children, href, ...props }: PropsWithChildren<{ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>>,
  ) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Github: () => <div data-testid="github-icon" />,
  Linkedin: () => <div data-testid="linkedin-icon" />,
  Instagram: () => <div data-testid="instagram-icon" />,
  Mail: () => <div data-testid="mail-icon" />,
}));

describe('Footer', () => {
  beforeEach(() => {
    // Mock current year to be consistent in tests
    jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2024);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the footer with correct content', () => {
    render(<Footer />);

    expect(screen.getByText('Agustin Cassani')).toBeInTheDocument();
    expect(screen.getByText(/Full Stack JavaScript Developer & Technical Lead/)).toBeInTheDocument();
    expect(screen.getByText('© 2024 Agustin Cassani. All rights reserved.')).toBeInTheDocument();
  });

  it('renders logo as a link to home', () => {
    render(<Footer />);

    const logoLink = screen.getByRole('link', { name: 'Agustin Cassani' });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders all social media links with correct attributes', () => {
    render(<Footer />);

    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/agustincassani/');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/surfercoder/');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    const instagramLink = screen.getByRole('link', { name: 'Instagram' });
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/thesurferdaddy/');
    expect(instagramLink).toHaveAttribute('target', '_blank');
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');

    const emailLink = screen.getByRole('link', { name: 'Email' });
    expect(emailLink).toHaveAttribute('href', 'mailto:agustinscassani@gmail.com');
  });

  it('renders all social media icons', () => {
    render(<Footer />);

    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
    expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');

    expect(footer).toHaveClass('bg-gray-900', 'text-white', 'py-12');
  });

  it('displays current year in copyright', () => {
    jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2025);
    render(<Footer />);

    expect(screen.getByText('© 2025 Agustin Cassani. All rights reserved.')).toBeInTheDocument();
  });

  it('has responsive layout classes', () => {
    const { container } = render(<Footer />);

    const flexContainer = container.querySelector('.flex.flex-col.md\\:flex-row');
    expect(flexContainer).toBeInTheDocument();
  });
});