import robots from './robots';

describe('robots', () => {
  it('returns correct robots configuration', () => {
    const result = robots();
    expect(result.rules).toEqual({
      userAgent: '*',
      allow: '/',
      disallow: '/AgustinCassaniCV.pdf',
    });
    expect(result.sitemap).toBe('https://agustincassani.com/sitemap.xml');
  });
});
