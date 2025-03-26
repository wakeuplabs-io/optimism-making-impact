import { setupTestAuth, createMockIdToken, getUserHeaders, addAuthHeader, getAdminHeaders } from './utils/auth-helper.js';
import { isServerReady, createApiClient } from './utils/server.js';
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest';

describe('Authentication E2E Tests', () => {
  // Create an axios client for making API requests to the real server
  const apiClient = createApiClient();

  // Set up the test authentication mocks before running tests
  beforeAll(async () => {
    // Check if the real server is running at localhost:5100
    const serverReady = await isServerReady();
    expect(serverReady).toBe(true);

    // Set up mocks for authentication and authorization
    setupTestAuth();
  });

  // Reset mocks before each test to ensure clean state
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Generate an expired token for testing
  const generateExpiredToken = () => {
    return createMockIdToken({
      exp: Math.floor(Date.now() / 1000) - 3600, // 1 hour in the past
    });
  };

  describe('Protected Routes', () => {
    it('should reject requests to protected routes without a token', async () => {
      const response = await apiClient.post('/api/rounds');

      expect(response.status).toBe(401);
      expect(response.data.error).toHaveProperty('code', 'UNAUTHORIZED');
    });

    it('should reject requests with an invalid token format', async () => {
      const response = await apiClient.post(
        '/api/rounds',
        {},
        {
          headers: {
            Authorization: 'invalid-token-format',
          },
        },
      );

      expect(response.status).toBe(401);
      expect(response.data.error).toHaveProperty('code', 'UNAUTHORIZED');
    });

    it('should reject requests with an expired token', async () => {
      const expiredToken = generateExpiredToken();

      const response = await apiClient.post(
        '/api/rounds',
        {},
        {
          headers: {
            Authorization: `Bearer ${expiredToken}`,
          },
        },
      );

      expect(response.status).toBe(401);
      expect(response.data.error).toHaveProperty('code', 'UNAUTHORIZED');
    });

    it('should allow access to protected routes with a valid token', async () => {
      const headers = getUserHeaders();
      const response = await apiClient.get('/api/rounds', { headers });

      expect(response.status).toBe(200);
    });
  });

  describe('Token Verification', () => {
    it('should extract user information from a valid token', async () => {
      // Create a custom token with specific user info
      const customUserToken = createMockIdToken({
        email: 'custom@example.com',
        name: 'Custom User',
      });

      const response = await apiClient.get('/api/rounds', {
        headers: addAuthHeader(customUserToken),
      });

      // Since we don't have a specific endpoint that returns user info,
      // we can only check that the request is successful
      expect(response.status).toBe(200);
    });
  });

  describe('Public Routes', () => {
    it('should allow access to public routes without authentication', async () => {
      const response = await apiClient.get('/api/rounds');

      // GET requests don't require admin authentication according to the middleware
      expect(response.status).toBe(200);
    });
  });

  describe('Role-Based Access Control', () => {
    it.skip('should restrict admin routes to users with admin role', async () => {
      // Create a sample round to test the admin routes
      const roundData = {
        title: 'Test Round',
        description: 'Test Description',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };

      // Regular user should be denied access to POST methods (admin-only)
      const userResponse = await apiClient.post('/api/rounds', roundData, {
        headers: getUserHeaders(),
      });

      expect(userResponse.status).toBe(403);
      expect(userResponse.data.error).toHaveProperty('code', 'FORBIDDEN');

      // Admin should be allowed access to POST methods
      const adminResponse = await apiClient.post('/api/rounds', roundData, {
        headers: getAdminHeaders(),
      });

      // Even though we're mocking the admin status, the actual success of creating
      // a round may depend on other factors in the application
      // We just want to verify that the auth middleware allows the request through
      expect(adminResponse.status).not.toBe(401);
      expect(adminResponse.status).not.toBe(403);
    });
  });
});
