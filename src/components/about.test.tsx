/* eslint-disable @next/next/no-img-element */
import { render, screen } from '@testing-library/react';
import About from './about';

// Mock next/image
import type { ImgHTMLAttributes, PropsWithChildren } from 'react';
jest.mock('next/image', () => {
  return function MockImage(
    { alt, src, fill, ...props }: PropsWithChildren<ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; src: string; alt: string }>,
  ) {
    return <img alt={alt} src={src} data-fill={fill} {...props} />;
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  MapPin: () => <div data-testid="map-pin-icon" />,
  Calendar: () => <div data-testid="calendar-icon" />,
  Briefcase: () => <div data-testid="briefcase-icon" />,
  GraduationCap: () => <div data-testid="graduation-cap-icon" />,
  Globe2: () => <div data-testid="globe2-icon" />,
}));

describe('About', () => {
  it('renders the about section with correct heading', () => {
    render(<About />);

    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Get to know more about my background and professional journey')).toBeInTheDocument();
  });

  it('renders profile image with correct attributes', () => {
    render(<About />);

    const image = screen.getByAltText('Agustin Cassani');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/profile-image.jpeg');
  });

  it('displays main description text', () => {
    render(<About />);

    expect(screen.getByText(/Dynamic Full Stack JavaScript Developer and Technical Lead/)).toBeInTheDocument();
    expect(screen.getByText(/With 17\+ years of experience/)).toBeInTheDocument();
    expect(screen.getByText(/I combine technical excellence with strategic vision/)).toBeInTheDocument();
  });

  it('renders all info cards with correct content', () => {
    render(<About />);

    expect(screen.getByText('Mendoza, Argentina')).toBeInTheDocument();
    expect(screen.getByText('17+ Years Experience')).toBeInTheDocument();
    expect(screen.getByText('Master of Computer Science')).toBeInTheDocument();
    expect(screen.getByText('Available for Projects')).toBeInTheDocument();
    expect(screen.getByText('Remote (Americas/EMEA)')).toBeInTheDocument();
  });

  it('renders all icons in cards', () => {
    render(<About />);

    expect(screen.getByTestId('map-pin-icon')).toBeInTheDocument();
    expect(screen.getByTestId('briefcase-icon')).toBeInTheDocument();
    expect(screen.getByTestId('graduation-cap-icon')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    expect(screen.getByTestId('globe2-icon')).toBeInTheDocument();
  });

  it('has correct section id for navigation', () => {
    const { container } = render(<About />);
    const section = container.querySelector('section');

    expect(section).toHaveAttribute('id', 'about');
  });

  it('applies correct styling classes', () => {
    const { container } = render(<About />);
    const section = container.querySelector('section');

    expect(section).toHaveClass('py-20', 'bg-white', 'dark:bg-gray-950');
  });
});