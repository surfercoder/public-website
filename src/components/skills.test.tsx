import { render, screen } from '@testing-library/react';
import Skills from './skills';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Code: () => <div data-testid="code-icon" />,
  Database: () => <div data-testid="database-icon" />,
  Layout: () => <div data-testid="layout-icon" />,
  Server: () => <div data-testid="server-icon" />,
  Terminal: () => <div data-testid="terminal-icon" />,
  TestTube: () => <div data-testid="test-tube-icon" />,
  Cloud: () => <div data-testid="cloud-icon" />,
  Blocks: () => <div data-testid="blocks-icon" />,
}));

describe('Skills', () => {
  it('renders the skills section with correct heading', () => {
    render(<Skills />);

    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    expect(screen.getByText('My expertise across various technologies and tools')).toBeInTheDocument();
  });

  it('renders all skill categories', () => {
    render(<Skills />);

    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
    expect(screen.getByText('Backend Development')).toBeInTheDocument();
    expect(screen.getByText('Databases & Query Languages')).toBeInTheDocument();
    expect(screen.getByText('UI Frameworks & Design Systems')).toBeInTheDocument();
    expect(screen.getByText('Testing & Quality Assurance')).toBeInTheDocument();
    expect(screen.getByText('DevOps & Infrastructure')).toBeInTheDocument();
    expect(screen.getByText('Blockchain Technology')).toBeInTheDocument();
    expect(screen.getByText('Development Tools')).toBeInTheDocument();
  });

  it('renders frontend development skills', () => {
    render(<Skills />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('React Native')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Redux')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders backend development skills', () => {
    render(<Skills />);

    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('Express')).toBeInTheDocument();
    expect(screen.getByText('Apollo Server')).toBeInTheDocument();
    expect(screen.getByText('Microservices Architecture')).toBeInTheDocument();
  });

  it('renders database skills', () => {
    render(<Skills />);

    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('GraphQL')).toBeInTheDocument();
  });

  it('renders testing skills', () => {
    render(<Skills />);

    expect(screen.getByText('Jest')).toBeInTheDocument();
    expect(screen.getByText('React Testing Library')).toBeInTheDocument();
    expect(screen.getByText('Cypress')).toBeInTheDocument();
    expect(screen.getByText('TDD Methodologies')).toBeInTheDocument();
  });

  it('renders DevOps skills', () => {
    render(<Skills />);

    expect(screen.getByText('AWS')).toBeInTheDocument();
    expect(screen.getAllByText('Docker').length).toBeGreaterThan(0);
    expect(screen.getByText('CI/CD Pipelines')).toBeInTheDocument();
  });

  it('renders blockchain skills', () => {
    render(<Skills />);

    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getByText('Smart Contracts Development')).toBeInTheDocument();
    expect(screen.getByText('Web3.js')).toBeInTheDocument();
  });

  it('renders all category icons', () => {
    render(<Skills />);

    expect(screen.getByTestId('layout-icon')).toBeInTheDocument(); // Frontend
    expect(screen.getByTestId('server-icon')).toBeInTheDocument(); // Backend
    expect(screen.getByTestId('database-icon')).toBeInTheDocument(); // Database
    expect(screen.getByTestId('code-icon')).toBeInTheDocument(); // UI Frameworks
    expect(screen.getByTestId('test-tube-icon')).toBeInTheDocument(); // Testing
    expect(screen.getByTestId('cloud-icon')).toBeInTheDocument(); // DevOps
    expect(screen.getByTestId('blocks-icon')).toBeInTheDocument(); // Blockchain
    expect(screen.getByTestId('terminal-icon')).toBeInTheDocument(); // Development Tools
  });

  it('has correct section id for navigation', () => {
    const { container } = render(<Skills />);
    const section = container.querySelector('section');

    expect(section).toHaveAttribute('id', 'skills');
  });

  it('applies correct styling classes', () => {
    const { container } = render(<Skills />);
    const section = container.querySelector('section');

    expect(section).toHaveClass('py-20', 'bg-white', 'dark:bg-gray-950');
  });

  it('renders skills in card layout', () => {
    render(<Skills />);

    // Check for skills categories being rendered
    const skillsContainer = screen.getByText('Frontend Development').closest('div');
    expect(skillsContainer).toBeInTheDocument();
  });

  it('renders development tools skills', () => {
    render(<Skills />);

    expect(screen.getByText('Git')).toBeInTheDocument();
    expect(screen.getByText('Cursor')).toBeInTheDocument();
    expect(screen.getByText('Postman')).toBeInTheDocument();
  });

  it('handles prefers-reduced-motion detection error', () => {
    const originalMatchMedia = window.matchMedia;

    // Mock matchMedia to throw an error
    window.matchMedia = jest.fn(() => {
      throw new Error('matchMedia error');
    });

    render(<Skills />);

    // Should render without errors
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();

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

    render(<Skills />);

    // Should render without errors and set the state
    expect(screen.getByText('Technical Skills')).toBeInTheDocument();

    // Restore original
    window.matchMedia = originalMatchMedia;
  });
});