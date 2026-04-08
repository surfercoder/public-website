import { render } from '@testing-library/react';
import { Github, Linkedin, Instagram } from './brand-icons';

describe('brand-icons', () => {
  it('renders Github icon as an svg', () => {
    const { container } = render(<Github data-testid="github" className="custom" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('data-testid', 'github');
    expect(svg).toHaveClass('custom');
    expect(container.querySelectorAll('path')).toHaveLength(2);
  });

  it('renders Linkedin icon as an svg', () => {
    const { container } = render(<Linkedin />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(container.querySelector('rect')).toBeInTheDocument();
    expect(container.querySelector('circle')).toBeInTheDocument();
  });

  it('renders Instagram icon as an svg', () => {
    const { container } = render(<Instagram />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(container.querySelector('rect')).toBeInTheDocument();
    expect(container.querySelector('line')).toBeInTheDocument();
  });
});
