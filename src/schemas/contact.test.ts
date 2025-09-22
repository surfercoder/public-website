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
      expect(errors.email).toContain("Invalid input: expected string, received undefined");
      expect(errors.message).toContain("Invalid input: expected string, received undefined");
      expect(errors.name).toContain("Invalid input: expected string, received undefined");
      expect(errors.subject).toContain("Invalid input: expected string, received undefined");
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