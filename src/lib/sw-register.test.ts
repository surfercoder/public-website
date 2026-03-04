import { registerServiceWorker } from './sw-register';

describe('registerServiceWorker', () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv, writable: true });
    jest.restoreAllMocks();
  });

  it('does nothing in non-production environment', () => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'development', writable: true });
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    registerServiceWorker();
    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });

  it('registers service worker on window load in production', () => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', writable: true });

    const mockRegister = jest.fn().mockResolvedValue({});
    Object.defineProperty(navigator, 'serviceWorker', {
      value: { register: mockRegister },
      configurable: true,
    });

    const listeners: Record<string, EventListener> = {};
    jest.spyOn(window, 'addEventListener').mockImplementation((event, handler) => {
      listeners[event] = handler as EventListener;
    });

    registerServiceWorker();

    expect(listeners['load']).toBeDefined();
    listeners['load'](new Event('load'));

    expect(mockRegister).toHaveBeenCalledWith('/sw.js');
  });

  it('handles service worker registration failure gracefully', () => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'production', writable: true });

    const mockRegister = jest.fn().mockRejectedValue(new Error('Registration failed'));
    Object.defineProperty(navigator, 'serviceWorker', {
      value: { register: mockRegister },
      configurable: true,
    });

    const listeners: Record<string, EventListener> = {};
    jest.spyOn(window, 'addEventListener').mockImplementation((event, handler) => {
      listeners[event] = handler as EventListener;
    });

    registerServiceWorker();
    listeners['load'](new Event('load'));

    expect(mockRegister).toHaveBeenCalledWith('/sw.js');
  });
});
