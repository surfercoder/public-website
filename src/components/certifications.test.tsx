import { render, screen } from '@testing-library/react';
import Certifications from './certifications';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Award: () => <div data-testid="award-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
}));

describe('Certifications', () => {
  it('renders the certifications section heading and subtitle', () => {
    render(<Certifications />);

    expect(screen.getByText('Certifications')).toBeInTheDocument();
    expect(screen.getByText('Professional certifications and continuous learning')).toBeInTheDocument();
  });

  it('renders all certification items', () => {
    render(<Certifications />);

    expect(screen.getByText('Ethereum Blockchain Developer Bootcamp With Solidity')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(screen.getByText("Ethereum and Solidity: The Complete Developer's Guide")).toBeInTheDocument();
    expect(screen.getByText('Next JS: The Complete Developer\'s Guide')).toBeInTheDocument();
    expect(screen.getByText('Internet of Things: Roadmap to a Connected World')).toBeInTheDocument();

    expect(screen.getAllByText('Udemy').length).toBeGreaterThan(0);
    expect(screen.getByText('MIT')).toBeInTheDocument();
  });

  it('renders icons', () => {
    render(<Certifications />);

    expect(screen.getAllByTestId('award-icon').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('calendar-icon').length).toBeGreaterThan(0);
  });

  it('has correct section id', () => {
    const { container } = render(<Certifications />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('id', 'certifications');
  });
});
