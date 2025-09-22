import { render, screen } from '@testing-library/react';
import ResumePage, { metadata } from './page';

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

// Mock ResumeViewer component
jest.mock('@/components/resume-viewer', () => {
  return function MockResumeViewer() {
    return <div data-testid="resume-viewer" />;
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Download: () => <div data-testid="download-icon" />,
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
}));

describe('ResumePage', () => {
  it('renders page with correct heading and description', () => {
    render(<ResumePage />);

    expect(screen.getByText('My Resume')).toBeInTheDocument();
    expect(screen.getByText('View and download my professional resume')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<ResumePage />);

    const backButton = screen.getByRole('link', { name: /back to home/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('href', '/');

    const downloadButton = screen.getByRole('link', { name: /download pdf/i });
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).toHaveAttribute('href', '/AgustinCassaniCV.pdf');
    expect(downloadButton).toHaveAttribute('download');
  });

  it('renders icons in buttons', () => {
    render(<ResumePage />);

    expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('download-icon')).toBeInTheDocument();
  });

  it('renders resume viewer component', () => {
    render(<ResumePage />);

    expect(screen.getByTestId('resume-viewer')).toBeInTheDocument();
  });

  it('has correct main wrapper styling', () => {
    const { container } = render(<ResumePage />);
    const main = container.querySelector('main');

    expect(main).toHaveClass(
      'min-h-screen',
      'py-20',
      'px-4',
      'sm:px-6',
      'lg:px-8',
      'bg-gray-50',
      'dark:bg-gray-900'
    );
  });

  it('has responsive layout classes', () => {
    const { container } = render(<ResumePage />);

    const buttonContainer = container.querySelector('.flex.flex-col.sm\\:flex-row');
    expect(buttonContainer).toBeInTheDocument();

    const buttonGroup = container.querySelector('.flex.gap-4');
    expect(buttonGroup).toBeInTheDocument();
  });

  it('has correct container and content structure', () => {
    const { container } = render(<ResumePage />);

    const container_ = container.querySelector('.container.mx-auto.max-w-6xl');
    expect(container_).toBeInTheDocument();

    const contentWrapper = container.querySelector('.bg-white.dark\\:bg-gray-800');
    expect(contentWrapper).toBeInTheDocument();
  });
});

describe('metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('Resume | Agustin Cassani');
  });

  it('has correct description', () => {
    expect(metadata.description).toBe(
      'Professional resume of Agustin Cassani, Full Stack JavaScript Developer with 17+ years of experience.'
    );
  });
});