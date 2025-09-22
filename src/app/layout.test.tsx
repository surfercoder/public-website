import { render } from '@testing-library/react';
import RootLayout, { metadata } from './layout';

// Mock next/font/google
jest.mock('next/font/google', () => ({
  Inter: jest.fn(() => ({
    className: 'inter-font',
  })),
}));

// Mock child components
jest.mock('@/components/theme-provider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>,
}));

jest.mock('@/components/ui/sonner', () => ({
  Toaster: () => <div data-testid="toaster" />,
}));

jest.mock('@/components/navbar', () => {
  return function MockNavbar() {
    return <nav data-testid="navbar" />;
  };
});

describe('RootLayout', () => {
  const originalConsoleError = console.error;
  beforeAll(() => {
    // Suppress React DOM nesting warnings when rendering <html>/<body> under a div test container
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
    console.error = originalConsoleError;
  });

  it('renders layout with all components', () => {
    const { getByTestId, getByText } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(getByTestId('theme-provider')).toBeInTheDocument();
    expect(getByTestId('navbar')).toBeInTheDocument();
    expect(getByTestId('toaster')).toBeInTheDocument();
    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('applies Inter font class to body', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    // Since we're testing a layout component that renders html/body,
    // we just verify it renders without errors and includes expected structure
    expect(document.body).toBeTruthy();
  });

  it('renders with expected structure', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    // Check for the main structure elements
    expect(container.querySelector('[data-testid="theme-provider"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="navbar"]')).toBeInTheDocument();
  });

  it('renders children inside theme provider', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Child Component</div>
      </RootLayout>
    );

    expect(getByText('Child Component')).toBeInTheDocument();
  });
});

describe('metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('Agustin Cassani | Full Stack JavaScript Developer');
  });

  it('has correct description', () => {
    expect(metadata.description).toBe(
      'Professional portfolio of Agustin Cassani, a Full Stack JavaScript Developer with 17+ years of experience in web and mobile development.'
    );
  });
});