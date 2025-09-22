import { getInitialSection } from './navigation';

describe('getInitialSection', () => {
  const sections = ['home', 'about', 'experience', 'skills', 'contact'];

  it('returns "resume" on /resume route', () => {
    expect(getInitialSection('/resume', '', sections)).toBe('resume');
  });

  it('returns cleaned hash section on / route if valid', () => {
    expect(getInitialSection('/', '#skills', sections)).toBe('skills');
    expect(getInitialSection('/', 'experience', sections)).toBe('experience');
  });

  it('falls back to home on / route with empty or invalid hash', () => {
    expect(getInitialSection('/', '', sections)).toBe('home');
    expect(getInitialSection('/', '#unknown', sections)).toBe('home');
  });

  it('falls back to home on non-home/non-resume routes', () => {
    expect(getInitialSection('/not-found', '', sections)).toBe('home');
    expect(getInitialSection('/blog/post', '#skills', sections)).toBe('home');
  });
});
