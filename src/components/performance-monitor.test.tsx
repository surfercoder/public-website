import { render } from '@testing-library/react';
import PerformanceMonitor from './performance-monitor';
import { registerServiceWorker } from '@/lib/sw-register';

jest.mock('@/lib/sw-register', () => ({
  registerServiceWorker: jest.fn(),
}));

describe('PerformanceMonitor', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders nothing (returns null)', () => {
    const { container } = render(<PerformanceMonitor />);
    expect(container.innerHTML).toBe('');
  });

  it('calls registerServiceWorker on mount', () => {
    render(<PerformanceMonitor />);
    expect(registerServiceWorker).toHaveBeenCalled();
  });

  it('sets up PerformanceObserver when available', () => {
    const mockObserve = jest.fn();
    const MockPerformanceObserver = jest.fn().mockImplementation(() => ({
      observe: mockObserve,
    }));
    Object.defineProperty(window, 'PerformanceObserver', {
      value: MockPerformanceObserver,
      configurable: true,
      writable: true,
    });

    render(<PerformanceMonitor />);

    expect(MockPerformanceObserver).toHaveBeenCalled();
    expect(mockObserve).toHaveBeenCalledWith({
      entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'],
    });
  });

  it('handles PerformanceObserver errors gracefully', () => {
    Object.defineProperty(window, 'PerformanceObserver', {
      value: jest.fn().mockImplementation(() => {
        throw new Error('Not supported');
      }),
      configurable: true,
      writable: true,
    });

    expect(() => render(<PerformanceMonitor />)).not.toThrow();
  });

  it('adds load event listener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    render(<PerformanceMonitor />);
    expect(addEventListenerSpy).toHaveBeenCalledWith('load', expect.any(Function));
  });
});
