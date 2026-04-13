import { render } from '@testing-library/react';
import SeoJsonLd from './seo-jsonld';

describe('SeoJsonLd', () => {
  it('renders Person and WebSite structured data', () => {
    const { container } = render(<SeoJsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    expect(scripts).toHaveLength(2);

    const person = JSON.parse(scripts[0].textContent!);
    expect(person['@type']).toBe('Person');
    expect(person.name).toBe('Agustin Cassani');

    const website = JSON.parse(scripts[1].textContent!);
    expect(website['@type']).toBe('WebSite');
    expect(website.name).toBe('Agustin Cassani');
  });

  it('does not include email in structured data', () => {
    const { container } = render(<SeoJsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');

    for (const script of scripts) {
      const data = JSON.parse(script.textContent!);
      expect(data.email).toBeUndefined();
    }

    expect(container.innerHTML).not.toContain('agustinscassani');
  });

  it('includes correct Person fields', () => {
    const { container } = render(<SeoJsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    const person = JSON.parse(scripts[0].textContent!);

    expect(person.url).toBe('https://agustincassani.com');
    expect(person.jobTitle).toBe('Senior Software Engineer & Technical Leader');
    expect(person.telephone).toBe('+54 9 (261) 688-6005');
    expect(person.sameAs).toEqual(expect.arrayContaining([
      'https://www.linkedin.com/in/agustincassani/',
      'https://github.com/surfercoder/',
    ]));
    expect(person.address.addressLocality).toBe('Mendoza');
  });

  it('includes correct WebSite fields', () => {
    const { container } = render(<SeoJsonLd />);
    const scripts = container.querySelectorAll('script[type="application/ld+json"]');
    const website = JSON.parse(scripts[1].textContent!);

    expect(website.url).toBe('https://agustincassani.com');
    expect(website.potentialAction['@type']).toBe('SearchAction');
  });
});
