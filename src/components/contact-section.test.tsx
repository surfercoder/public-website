import { render, screen } from '@testing-library/react';
import ContactSection from './contact-section';

// Mock the ContactForm component
jest.mock('@/components/contact-form', () => {
  return function MockContactForm() {
    return <div data-testid="contact-form" />;
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Mail: () => <div data-testid="mail-icon" />,
  Phone: () => <div data-testid="phone-icon" />,
  MapPin: () => <div data-testid="map-pin-icon" />,
  Linkedin: () => <div data-testid="linkedin-icon" />,
  Github: () => <div data-testid="github-icon" />,
  Instagram: () => <div data-testid="instagram-icon" />,
}));

describe('ContactSection', () => {
  it('renders the contact section with correct heading', () => {
    render(<ContactSection />);

    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText(/Have a project in mind or want to discuss potential opportunities/)).toBeInTheDocument();
  });

  it('renders contact information with correct details', () => {
    render(<ContactSection />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('agustinscassani@gmail.com')).toBeInTheDocument();

    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('+54 9 (261) 688-6005')).toBeInTheDocument();

    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Mendoza, Argentina')).toBeInTheDocument();
  });

  it('renders contact information with correct links', () => {
    render(<ContactSection />);

    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:agustinscassani@gmail.com');

    const phoneLink = screen.getByRole('link', { name: /phone/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:+5492616886005');

    const locationLink = screen.getByRole('link', { name: /location/i });
    expect(locationLink).toHaveAttribute('href', 'https://maps.google.com/?q=Mendoza,Argentina');
    expect(locationLink).toHaveAttribute('target', '_blank');
    expect(locationLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders social media links with correct attributes', () => {
    render(<ContactSection />);

    const linkedinLink = screen.getByRole('link', { name: 'LinkedIn' });
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/agustincassani/');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/surfercoder/');

    const instagramLink = screen.getByRole('link', { name: 'Instagram' });
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/thesurferdaddy/');
  });

  it('renders all contact icons', () => {
    render(<ContactSection />);

    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
    expect(screen.getByTestId('phone-icon')).toBeInTheDocument();
    expect(screen.getByTestId('map-pin-icon')).toBeInTheDocument();
  });

  it('renders all social media icons', () => {
    render(<ContactSection />);

    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
    expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
  });

  it('renders the contact form', () => {
    render(<ContactSection />);

    expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    expect(screen.getByText('Send Me a Message')).toBeInTheDocument();
    expect(screen.getByText("Fill out the form below and I'll get back to you as soon as possible.")).toBeInTheDocument();
  });

  it('has correct section id for navigation', () => {
    const { container } = render(<ContactSection />);
    const section = container.querySelector('section');

    expect(section).toHaveAttribute('id', 'contact');
  });

  it('applies correct styling classes', () => {
    const { container } = render(<ContactSection />);
    const section = container.querySelector('section');

    expect(section).toHaveClass('py-20', 'bg-gray-50', 'dark:bg-gray-900');
  });

  it('renders contact information and connect sections', () => {
    render(<ContactSection />);

    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText('Connect With Me')).toBeInTheDocument();
  });
});