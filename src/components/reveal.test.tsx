/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, render, screen } from '@testing-library/react';
import Reveal from './reveal';

type IOCallback = (entries: Array<{ isIntersecting: boolean }>) => void;

describe('Reveal', () => {
  const originalIO = window.IntersectionObserver;
  let callbacks: IOCallback[] = [];
  let instances: Array<{ observe: jest.Mock; disconnect: jest.Mock }> = [];

  beforeEach(() => {
    callbacks = [];
    instances = [];
    (window as any).IntersectionObserver = jest.fn((cb: IOCallback) => {
      callbacks.push(cb);
      const instance = { observe: jest.fn(), disconnect: jest.fn() };
      instances.push(instance);
      return instance;
    });
  });

  afterEach(() => {
    (window as any).IntersectionObserver = originalIO;
  });

  it('renders children inside the default div tag', () => {
    render(<Reveal>hello</Reveal>);
    expect(screen.getByText('hello')).toBeInTheDocument();
    expect(screen.getByText('hello').tagName).toBe('DIV');
  });

  it('renders with a custom tag and className', () => {
    render(
      <Reveal as="article" className="custom-class">
        article body
      </Reveal>,
    );
    const node = screen.getByText('article body');
    expect(node.tagName).toBe('ARTICLE');
    expect(node).toHaveClass('custom-class');
  });

  it('starts hidden with willChange when IntersectionObserver is available', () => {
    render(<Reveal>fade in</Reveal>);
    const node = screen.getByText('fade in');
    expect(node).toHaveStyle({ opacity: '0' });
    expect(node.style.willChange).toBe('opacity, transform');
  });

  it('reveals and clears willChange when the section intersects', () => {
    render(<Reveal y={32} delay={50}>fade in</Reveal>);
    const node = screen.getByText('fade in');

    act(() => {
      callbacks[0]([{ isIntersecting: true }]);
    });

    expect(node).toHaveStyle({ opacity: '1' });
    expect(node.style.willChange).toBe('');
    expect(instances[0].disconnect).toHaveBeenCalled();
  });

  it('ignores non-intersecting entries', () => {
    render(<Reveal>fade in</Reveal>);
    const node = screen.getByText('fade in');

    act(() => {
      callbacks[0]([{ isIntersecting: false }]);
    });

    expect(node).toHaveStyle({ opacity: '0' });
  });

  it('disconnects the observer on unmount', () => {
    const { unmount } = render(<Reveal>fade in</Reveal>);
    unmount();
    expect(instances[0].disconnect).toHaveBeenCalled();
  });

  it('is visible immediately when IntersectionObserver is unavailable', () => {
    (window as any).IntersectionObserver = undefined;
    render(<Reveal>no-io</Reveal>);
    const node = screen.getByText('no-io');
    expect(node).toHaveStyle({ opacity: '1' });
    expect(node.style.willChange).toBe('');
  });
});
