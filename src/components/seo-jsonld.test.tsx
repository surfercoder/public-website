import { render } from '@testing-library/react';
import SeoJsonLd from './seo-jsonld';

type Schema = Record<string, unknown>;

function parseGraph(container: HTMLElement): { context: string; graph: Schema[] } {
  const scripts = container.querySelectorAll('script[type="application/ld+json"]');
  // Should only emit a single <script> block
  expect(scripts).toHaveLength(1);
  const parsed = JSON.parse(scripts[0].textContent!) as Schema;
  return {
    context: parsed['@context'] as string,
    graph: parsed['@graph'] as Schema[],
  };
}

function findByType(schemas: Schema[], type: string) {
  return schemas.find((s) => s['@type'] === type);
}

describe('SeoJsonLd', () => {
  it('emits a single @graph block containing all structured data', () => {
    const { container } = render(<SeoJsonLd />);
    const { context, graph } = parseGraph(container);

    expect(context).toBe('https://schema.org');
    expect(graph).toHaveLength(4);
    expect(findByType(graph, 'Person')).toBeDefined();
    expect(findByType(graph, 'ProfilePage')).toBeDefined();
    expect(findByType(graph, 'BreadcrumbList')).toBeDefined();
    expect(findByType(graph, 'WebSite')).toBeDefined();
  });

  it('does not include email in structured data', () => {
    const { container } = render(<SeoJsonLd />);
    const { graph } = parseGraph(container);

    for (const data of graph) {
      expect(data.email).toBeUndefined();
    }

    expect(container.innerHTML).not.toContain('agustinscassani');
  });

  it('includes correct Person fields', () => {
    const { container } = render(<SeoJsonLd />);
    const person = findByType(parseGraph(container).graph, 'Person')!;

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
    expect((person.address as Schema).addressLocality).toBe('Mendoza');
  });

  it('includes correct WebSite fields', () => {
    const { container } = render(<SeoJsonLd />);
    const website = findByType(parseGraph(container).graph, 'WebSite')!;

    expect(website.url).toBe('https://agustincassani.com');
    expect((website.potentialAction as Schema)['@type']).toBe('SearchAction');
  });

  it('includes correct ProfilePage fields', () => {
    const { container } = render(<SeoJsonLd />);
    const profile = findByType(parseGraph(container).graph, 'ProfilePage')!;

    expect(profile.url).toBe('https://agustincassani.com');
    expect((profile.mainEntity as Schema)['@id']).toBe('https://agustincassani.com/#person');
  });

  it('includes correct BreadcrumbList fields', () => {
    const { container } = render(<SeoJsonLd />);
    const breadcrumb = findByType(parseGraph(container).graph, 'BreadcrumbList')!;

    const items = breadcrumb.itemListElement as Schema[];
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe('Home');
    expect(items[0].position).toBe(1);
  });
});
