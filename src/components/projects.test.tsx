import React from 'react';
import { render, screen } from '@testing-library/react';
import Projects from './projects';

import type { ImgHTMLAttributes, PropsWithChildren, AnchorHTMLAttributes } from 'react';

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage(
    { alt, src, fill, ...props }: PropsWithChildren<ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; src: string; alt: string }>,
  ) {
    return React.createElement('img', { alt, src, 'data-fill': fill, ...props });
  };
});

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink(
    { children, href, ...props }: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>,
  ) {
    return React.createElement('a', { href, ...props }, children);
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ExternalLink: () => <div data-testid="external-link-icon" />,
}));

describe('Projects', () => {
  it('renders the projects section heading and subtitle', () => {
    render(<Projects />);

    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(
      screen.getByText(/Selected products I've built from zero to production/),
    ).toBeInTheDocument();
  });

  it('has correct section id', () => {
    const { container } = render(<Projects />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('id', 'projects');
  });

  it('renders both project cards with names', () => {
    render(<Projects />);

    expect(screen.getByText('IMI Health')).toBeInTheDocument();
    expect(screen.getByText('Puntos Club')).toBeInTheDocument();
  });

  it('renders project descriptions', () => {
    render(<Projects />);

    expect(screen.getByText(/AI-powered medical documentation SaaS/)).toBeInTheDocument();
    expect(screen.getByText(/White-label loyalty platform/)).toBeInTheDocument();
  });

  it('renders project tags', () => {
    render(<Projects />);

    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Supabase')).toBeInTheDocument();
    expect(screen.getByText('Claude API')).toBeInTheDocument();
    expect(screen.getByText('AssemblyAI')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('REST APIs')).toBeInTheDocument();
    expect(screen.getByText('Loyalty Platform')).toBeInTheDocument();
  });

  it('renders links with correct urls, target and rel attributes', () => {
    render(<Projects />);

    const imiLink = screen.getByRole('link', { name: 'IMI Health' });
    expect(imiLink).toHaveAttribute('href', 'https://www.imihealth.ai/');
    expect(imiLink).toHaveAttribute('target', '_blank');
    expect(imiLink).toHaveAttribute('rel', 'noopener noreferrer');

    const puntosLink = screen.getByRole('link', { name: 'Puntos Club' });
    expect(puntosLink).toHaveAttribute('href', 'https://puntosclub.ar/');
    expect(puntosLink).toHaveAttribute('target', '_blank');
    expect(puntosLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders project images with alt text', () => {
    render(<Projects />);

    const imiImage = screen.getByAltText('IMI Health screenshot');
    expect(imiImage).toHaveAttribute('src', '/projects/imihealth.png');

    const puntosImage = screen.getByAltText('Puntos Club screenshot');
    expect(puntosImage).toHaveAttribute('src', '/projects/puntosclub.png');
  });

  it('renders external link icons', () => {
    render(<Projects />);
    expect(screen.getAllByTestId('external-link-icon').length).toBe(2);
  });
});
