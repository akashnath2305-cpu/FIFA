import { signupSchema } from '../lib/validations/auth';

describe('Signup Schema Validation', () => {
  it('should validate a correct payload', () => {
    const validData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      role: 'FAN'
    };
    const result = signupSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject an invalid email', () => {
    const invalidData = {
      email: 'not-an-email',
      password: 'password123',
      name: 'Test User'
    };
    const result = signupSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject a short password', () => {
    const invalidData = {
      email: 'test@example.com',
      password: 'short',
      name: 'Test User'
    };
    const result = signupSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
