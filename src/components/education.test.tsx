import { render, screen } from '@testing-library/react';
import Education from './education';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  GraduationCap: () => <div data-testid="graduation-cap-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
  MapPin: () => <div data-testid="map-pin-icon" />,
}));

describe('Education', () => {
  it('renders the education section heading and subtitle', () => {
    render(<Education />);

    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Academic background and language certifications')).toBeInTheDocument();
  });

  it('renders all education items', () => {
    render(<Education />);

    expect(screen.getByText('Master of Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Universidad Católica Argentina')).toBeInTheDocument();
    expect(screen.getByText('2014-2015')).toBeInTheDocument();

    expect(screen.getByText('Bachelor of Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Universidad Juan Agustín Maza')).toBeInTheDocument();
    expect(screen.getByText('2005-2009')).toBeInTheDocument();

    expect(screen.getByText('Cambridge Advanced English (CAE)')).toBeInTheDocument();
    expect(screen.getByText('First Certificate in English (FCE)')).toBeInTheDocument();
  });

  it('renders icons', () => {
    render(<Education />);

    expect(screen.getAllByTestId('graduation-cap-icon').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('calendar-icon').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('map-pin-icon').length).toBeGreaterThan(0);
  });

  it('has correct section id', () => {
    const { container } = render(<Education />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('id', 'education');
  });
});
