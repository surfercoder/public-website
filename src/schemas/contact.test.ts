import ContactSchema from './contact';

describe('ContactSchema', () => {
  it('should validate a valid contact form data', () => {
    const validData = {
      email: 'test@example.com',
      message: 'Test message',
      name: 'John Doe',
      subject: 'Test Subject',
    };

    const result = ContactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should require all fields', () => {
    const invalidData = {};

    const result = ContactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.email).toEqual(["Required"]);
      expect(errors.message).toEqual(["Required"]);
      expect(errors.name).toEqual(["Required"]);
      expect(errors.subject).toEqual(["Required"]);
    }
  });

  it('should validate email format', () => {
    const invalidData = {
      email: 'invalid-email',
      message: 'Test message',
      name: 'John Doe',
      subject: 'Test Subject',
    };

    const result = ContactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.email).toContain('Email is invalid.');
    }
  });

  it('should not allow empty strings', () => {
    const invalidData = {
      email: '',
      message: '',
      name: '',
      subject: '',
    };

    const result = ContactSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.email).toEqual(["Email is required.", "Email is invalid."]);
      expect(errors.message).toContain('Message is required.');
      expect(errors.name).toContain('Name is required.');
      expect(errors.subject).toContain('Subject is required.');
    }
  });
});