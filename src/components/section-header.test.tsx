import { render, screen } from '@testing-library/react';
import SectionHeader from './section-header';

describe('SectionHeader', () => {
  it('renders title with the last word in the gradient span', () => {
    const { container } = render(<SectionHeader title="Featured Projects" />);
    const heading = container.querySelector('h2')!;
    expect(heading.textContent).toBe('Featured Projects');
    const gradient = container.querySelector('.gradient-text');
    expect(gradient?.textContent).toBe(' Projects');
  });

  it('renders eyebrow when provided', () => {
    render(<SectionHeader eyebrow="Selected Work" title="Featured Projects" />);
    expect(screen.getByText('Selected Work')).toBeInTheDocument();
  });

  it('omits eyebrow when not provided', () => {
    const { container } = render(<SectionHeader title="Some Title" />);
    expect(container.querySelector('.uppercase')).toBeNull();
  });

  it('renders subtitle when provided', () => {
    render(<SectionHeader title="Title Words" subtitle="A short subtitle" />);
    expect(screen.getByText('A short subtitle')).toBeInTheDocument();
  });

  it('omits subtitle when not provided', () => {
    const { container } = render(<SectionHeader title="Title Words" />);
    expect(container.querySelector('p')).toBeNull();
  });

  it('applies centered layout by default', () => {
    const { container } = render(<SectionHeader title="Title Words" subtitle="Sub" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('text-center');
    const subtitle = container.querySelector('p')!;
    expect(subtitle).toHaveClass('mx-auto');
  });

  it('omits centered layout when centered is false', () => {
    const { container } = render(
      <SectionHeader title="Title Words" subtitle="Sub" centered={false} />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).not.toHaveClass('text-center');
    const subtitle = container.querySelector('p')!;
    expect(subtitle).not.toHaveClass('mx-auto');
  });

  it('inserts spaces between non-first, non-last words in a multi-word title', () => {
    const { container } = render(<SectionHeader title="One Two Three Four" />);
    const heading = container.querySelector('h2')!;
    expect(heading.textContent).toBe('One Two Three Four');
  });
});
