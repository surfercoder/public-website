import '@testing-library/jest-dom';

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