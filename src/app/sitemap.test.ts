import sitemap from './sitemap';

describe('sitemap', () => {
  it('returns sitemap entries with correct URLs', () => {
    const result = sitemap();
    expect(result).toHaveLength(2);
    expect(result[0].url).toBe('https://agustincassani.com');
    expect(result[0].changeFrequency).toBe('weekly');
    expect(result[0].priority).toBe(1);
    expect(result[1].url).toBe('https://agustincassani.com/resume');
    expect(result[1].changeFrequency).toBe('monthly');
    expect(result[1].priority).toBe(0.8);
  });

  it('includes lastModified dates', () => {
    const result = sitemap();
    result.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date);
    });
  });
});
