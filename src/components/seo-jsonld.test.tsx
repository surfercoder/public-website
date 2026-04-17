import { render } from '@testing-library/react';
import SeoJsonLd from './seo-jsonld';

function parseAllJsonLd(container: HTMLElement) {
  const scripts = container.querySelectorAll('script[type="application/ld+json"]');
  return Array.from(scripts).map((s) => JSON.parse(s.textContent!));
}

function findByType(schemas: Record<string, unknown>[], type: string) {
  return schemas.find((s) => s['@type'] === type);
}

describe('SeoJsonLd', () => {
  it('renders all structured data blocks', () => {
    const { container } = render(<SeoJsonLd />);
    const schemas = parseAllJsonLd(container);

    expect(schemas).toHaveLength(4);
    expect(findByType(schemas, 'Person')).toBeDefined();
    expect(findByType(schemas, 'ProfilePage')).toBeDefined();
    expect(findByType(schemas, 'BreadcrumbList')).toBeDefined();
    expect(findByType(schemas, 'WebSite')).toBeDefined();
  });

  it('does not include email in structured data', () => {
    const { container } = render(<SeoJsonLd />);
    const schemas = parseAllJsonLd(container);

    for (const data of schemas) {
      expect((data as Record<string, unknown>).email).toBeUndefined();
    }

    expect(container.innerHTML).not.toContain('agustinscassani');
  });

  it('includes correct Person fields', () => {
    const { container } = render(<SeoJsonLd />);
    const person = findByType(parseAllJsonLd(container), 'Person')!;

    expect(person.name).toBe('Agustin Cassani');
    expect(person.url).toBe('https://agustincassani.com');
    expect(person.jobTitle).toBe('Senior Software Engineer & Technical Leader');
    expect(person.telephone).toBe('+54 9 (261) 688-6005');
    expect(person.description).toContain('Senior Software Engineer');
    expect(person.knowsAbout).toEqual(expect.arrayContaining(['React', 'Next.js', 'TypeScript']));
    expect(person.sameAs).toEqual(expect.arrayContaining([
      'https://www.linkedin.com/in/agustincassani/',
      'https://github.com/surfercoder/',
    ]));
    expect((person.address as Record<string, unknown>).addressLocality).toBe('Mendoza');
  });

  it('includes correct WebSite fields', () => {
    const { container } = render(<SeoJsonLd />);
    const website = findByType(parseAllJsonLd(container), 'WebSite')!;

    expect(website.url).toBe('https://agustincassani.com');
    expect((website.potentialAction as Record<string, unknown>)['@type']).toBe('SearchAction');
  });

  it('includes correct ProfilePage fields', () => {
    const { container } = render(<SeoJsonLd />);
    const profile = findByType(parseAllJsonLd(container), 'ProfilePage')!;

    expect(profile.url).toBe('https://agustincassani.com');
    expect((profile.mainEntity as Record<string, unknown>)['@id']).toBe('https://agustincassani.com/#person');
  });

  it('includes correct BreadcrumbList fields', () => {
    const { container } = render(<SeoJsonLd />);
    const breadcrumb = findByType(parseAllJsonLd(container), 'BreadcrumbList')!;

    const items = breadcrumb.itemListElement as Record<string, unknown>[];
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe('Home');
    expect(items[0].position).toBe(1);
  });
});
