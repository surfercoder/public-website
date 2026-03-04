import '@testing-library/jest-dom';

// Mock window.matchMedia for jsdom (used by useSyncExternalStore in components)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock nodemailer for contact form tests
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-message-id' }),
  }),
}));

// Mock environment variables
process.env = {
  ...process.env,
  EMAIL_SENDER: 'test@example.com',
  EMAIL_RECIPIENT: 'recipient@example.com',
  GOOGLE_APP_PASSWORD: 'test-password',
};