import { render } from '@testing-library/react';
import Home, { metadata } from './page';

// Mock all component dependencies
jest.mock('@/components/hero', () => {
  return function MockHero() {
    return <div data-testid="hero" />;
  };
});

jest.mock('@/components/about', () => {
  return function MockAbout() {
    return <div data-testid="about" />;
  };
});

jest.mock('@/components/experience', () => {
  return function MockExperience() {
    return <div data-testid="experience" />;
  };
});

jest.mock('@/components/skills', () => {
  return function MockSkills() {
    return <div data-testid="skills" />;
  };
});

jest.mock('@/components/education', () => {
  return function MockEducation() {
    return <div data-testid="education" />;
  };
});

jest.mock('@/components/certifications', () => {
  return function MockCertifications() {
    return <div data-testid="certifications" />;
  };
});

jest.mock('@/components/contact-section', () => {
  return function MockContactSection() {
    return <div data-testid="contact-section" />;
  };
});

jest.mock('@/components/footer', () => {
  return function MockFooter() {
    return <div data-testid="footer" />;
  };
});

describe('Home', () => {
  it('renders all main sections', () => {
    const { getByTestId } = render(<Home />);

    expect(getByTestId('hero')).toBeInTheDocument();
    expect(getByTestId('about')).toBeInTheDocument();
    expect(getByTestId('experience')).toBeInTheDocument();
    expect(getByTestId('skills')).toBeInTheDocument();
    expect(getByTestId('education')).toBeInTheDocument();
    expect(getByTestId('certifications')).toBeInTheDocument();
    expect(getByTestId('contact-section')).toBeInTheDocument();
    expect(getByTestId('footer')).toBeInTheDocument();
  });

  it('has correct main wrapper class', () => {
    const { container } = render(<Home />);
    const main = container.querySelector('main');

    expect(main).toHaveClass('min-h-screen');
  });

  it('renders sections in correct order', () => {
    const { container } = render(<Home />);
    const main = container.querySelector('main');
    const children = main?.children;

    expect(children?.[0]).toHaveAttribute('data-testid', 'hero');
    expect(children?.[1]).toHaveAttribute('data-testid', 'about');
    expect(children?.[2]).toHaveAttribute('data-testid', 'experience');
    expect(children?.[3]).toHaveAttribute('data-testid', 'skills');
    expect(children?.[4]).toHaveAttribute('data-testid', 'education');
    expect(children?.[5]).toHaveAttribute('data-testid', 'certifications');
    expect(children?.[6]).toHaveAttribute('data-testid', 'contact-section');
    expect(children?.[7]).toHaveAttribute('data-testid', 'footer');
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