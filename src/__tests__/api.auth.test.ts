/**
 * @jest-environment node
 */
import { createMocks } from 'node-mocks-http';
import { prismaMock } from '../lib/singleton';
import { POST } from '../app/api/auth/login/route';

// Explicitly mock prisma here so Jest hoists it before route.ts imports it
jest.mock('../lib/prisma', () => ({
  prisma: require('../lib/singleton').prismaMock
}));

// Mock the auth lib because 'jose' is an ESM module that breaks Jest compilation
jest.mock('../lib/auth.ts', () => ({
  encrypt: jest.fn().mockResolvedValue('mocked-token'),
  decrypt: jest.fn().mockResolvedValue({ userId: '123' }),
  SESSION_COOKIE: 'session',
}));

describe('API Route - POST /api/auth/login', () => {
  it('should return 400 if validation fails', async () => {
    const { req } = createMocks({
      method: 'POST',
      json: () => Promise.resolve({
        email: 'invalid-email',
        password: '123' // Too short
      }),
    });
    
    // We mock NextRequest structure
    const request = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'invalid-email', password: '123' })
    }) as any;

    const response = await POST(request);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.message).toBeDefined();
  });

  it('should return 401 for invalid credentials', async () => {
    // Mock Prisma to return null (user not found)
    prismaMock.user.findUnique.mockResolvedValue(null);

    const request = new Request('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
    }) as any;

    const response = await POST(request);
    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.message).toBe('Invalid credentials');
  });
});
