import { sendContact } from './contact';
import nodemailer from 'nodemailer';
import { EMPTY_ACTION_STATE } from '@/lib/utils';

describe('sendContact', () => {
  const mockFormData = new FormData();

  beforeEach(() => {
    // Reset FormData before each test
    mockFormData.set('name', 'John Doe');
    mockFormData.set('email', 'john@example.com');
    mockFormData.set('subject', 'Test Subject');
    mockFormData.set('message', 'Test Message');
  });

  it('sends email successfully with valid data', async () => {
    const result = await sendContact(EMPTY_ACTION_STATE, mockFormData);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.GOOGLE_APP_PASSWORD,
      },
    });

    const transport = (nodemailer.createTransport as jest.Mock).mock.results[0].value;
    expect(transport.sendMail).toHaveBeenCalledWith({
      from: 'john@example.com',
      replyTo: 'john@example.com',
      to: process.env.EMAIL_RECIPIENT,
      subject: 'Test Subject',
      text: expect.stringContaining('John Doe'),
    });

    expect(result.message).toBe("Your message has been sent successfully! I'll get back to you soon.");
  });

  it('returns error state for invalid form data', async () => {
    mockFormData.delete('email');
    const result = await sendContact(EMPTY_ACTION_STATE, mockFormData);

    expect(result.fieldErrors).toHaveProperty('email');
    expect(result.fieldErrors?.email).toEqual(["Required"]);
  });

  it('handles email sending failure', async () => {
    const mockError = new Error('Failed to send email');
    (nodemailer.createTransport as jest.Mock)().sendMail.mockRejectedValueOnce(mockError);

    const result = await sendContact(EMPTY_ACTION_STATE, mockFormData);

    expect(result.message).toBe('Failed to send email');
  });
});