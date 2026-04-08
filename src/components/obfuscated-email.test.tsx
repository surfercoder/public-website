import { render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { ObfuscatedEmailLink, ObfuscatedEmailText } from './obfuscated-email';

describe('ObfuscatedEmailLink', () => {
  it('renders children inside a mailto: link on the client', () => {
    render(
      <ObfuscatedEmailLink ariaLabel="Email">
        <span>Contact me</span>
      </ObfuscatedEmailLink>,
    );

    const link = screen.getByRole('link', { name: 'Email' });
    expect(link).toHaveAttribute('href', 'mailto:agustinscassani@gmail.com');
    expect(link).toHaveTextContent('Contact me');
  });

  it('applies className to the anchor', () => {
    const { container } = render(
      <ObfuscatedEmailLink className="my-class" ariaLabel="Email">
        Click
      </ObfuscatedEmailLink>,
    );

    const link = container.querySelector('a');
    expect(link).toHaveClass('my-class');
  });

  it('renders an anchor without href during SSR (no hydration mismatch)', () => {
    const html = renderToString(
      <ObfuscatedEmailLink className="ssr-class" ariaLabel="Email">
        Click
      </ObfuscatedEmailLink>,
    );

    expect(html).not.toContain('agustinscassani');
    expect(html).not.toContain('mailto:');
    expect(html).toContain('Click');
    expect(html).toContain('<a');
  });
});

describe('ObfuscatedEmailText', () => {
  it('renders the decoded email on the client', () => {
    render(<ObfuscatedEmailText />);

    expect(screen.getByText('agustinscassani@gmail.com')).toBeInTheDocument();
  });

  it('applies className to the span', () => {
    const { container } = render(<ObfuscatedEmailText className="email-text" />);

    const span = container.querySelector('span');
    expect(span).toHaveClass('email-text');
    expect(span).toHaveTextContent('agustinscassani@gmail.com');
  });

  it('renders an empty span during SSR', () => {
    const html = renderToString(<ObfuscatedEmailText className="ssr-class" />);

    expect(html).not.toContain('agustinscassani');
    expect(html).not.toContain('gmail');
    expect(html).toContain('<span');
  });
});
