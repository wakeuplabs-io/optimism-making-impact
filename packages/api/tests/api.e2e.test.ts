import { setupTestAuth, createUserToken, getUserHeaders, getAdminHeaders } from './utils/auth-helper.js';
import { isServerReady, createApiClient } from './utils/server.js';
import { prisma } from '@/lib/prisma-instance.js';
import jwt from 'jsonwebtoken';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('API Endpoints - /api/rounds', () => {
  // Create API client for the real server
  const apiClient = createApiClient();
  let testUser: { authToken: string };

  // Set up authentication and clear test database before all tests
  beforeAll(async () => {
    // Make sure we're using test environment
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('Tests should only run in test environment');
    }

    // Check if the real server is running
    const serverReady = await isServerReady();
    if (!serverReady) {
      throw new Error('Real API server is not running on localhost:5100. Start it with "pnpm dev" before running tests.');
    }

    // Set up auth mocking
    setupTestAuth();
    // Get a test user for authentication using a proper JWT token
    testUser = { authToken: createUserToken() };
    console.log('Test user token created:', testUser.authToken); // Debug log
    console.log('Decoded test user token:', jwt.decode(testUser.authToken)); // Debug log

    // Clear relevant tables
    await prisma.round.deleteMany({});
  });

  let createdRoundId: string;

  // Test data
  const newRound = {
    link1: 'https://example.com/link1',
    link2: 'https://example.com/link2',
  };

  const updatedRound = {
    link1: 'https://example.com/updated-link1',
    link2: 'https://example.com/updated-link2',
  };

  describe.skip('POST /api/rounds', () => {
    it('should create a new round by duplicating the last round', async () => {
      // First create a round in the database so we have something to duplicate
      await prisma.round.create({
        data: {
          link1: 'https://example.com/initial-link1',
          link2: 'https://example.com/initial-link2',
        },
      });

      const headers = getAdminHeaders();
      console.log('Request headers:', headers); // Debug log

      // POST /api/rounds doesn't accept any data - it duplicates the last round
      const response = await apiClient.post('/api/rounds', {}, { headers });
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.status).toBe(201);

      expect(response.data).toBeDefined();
      expect(response.data.message).toBe('Round created successfully');

      // Get the latest round to get its ID for later tests
      const latestRound = await prisma.round.findFirst({
        orderBy: { id: 'desc' },
      });

      expect(latestRound).toBeDefined();
      createdRoundId = String(latestRound?.id);
    });

    it('should return 400 when there is no previous round to duplicate', async () => {
      // Clear all rounds to test the error case
      await prisma.round.deleteMany({});

      const response = await apiClient.post('/api/rounds', {}, { headers: getAdminHeaders() });
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.status).toBe(400);

      expect(response.data.error).toBeDefined();
      expect(response.data.message).toBe("Can't duplicate round if there's no previous round.");
    });
  });

  describe('GET /api/rounds', () => {
    it('should return a list of rounds', async () => {
      const response = await apiClient.get('/api/rounds', {
        headers: getUserHeaders(), // Use the helper function
      });
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.status).toBe(200);

      expect(response.data).toBeDefined();
      const { rounds } = response.data.data;
      expect(rounds).toBeDefined();
      expect(Array.isArray(rounds)).toBe(true);
      expect(rounds.length).toBeGreaterThan(0);
    });

    it('should return a specific round by ID', async () => {
      // Skip if no round was created
      if (!createdRoundId) {
        return;
      }

      const response = await apiClient.get(`/api/rounds/${createdRoundId}`, {
        headers: getUserHeaders(), // Use the helper function
      });
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.status).toBe(200);

      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).toBe(Number(createdRoundId));
    });

    it('should return 404 for non-existent round ID', async () => {
      const nonExistentId = 'non-existent-id';

      const response = await apiClient.get(`/api/rounds/${nonExistentId}`, {
        headers: getUserHeaders(), // Use the helper function
      });
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/rounds/:id', () => {
    it('should update an existing round', async () => {
      // Skip if no round was created
      if (!createdRoundId) {
        return;
      }

      const response = await apiClient.put(`/api/rounds/${createdRoundId}`, updatedRound, {
        headers: getUserHeaders(), // Use the helper function
      });
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.status).toBe(201);

      expect(response.data).toBeDefined();
      expect(response.data.message).toBe('Round edited successfully');
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).toBe(Number(createdRoundId));
      expect(response.data.data.link1).toBe(updatedRound.link1);
      expect(response.data.data.link2).toBe(updatedRound.link2);
    });

    it.skip('should return 404 when updating non-existent round', async () => {
      const nonExistentId = 'non-existent-id';

      const response = await apiClient.put(`/api/rounds/${nonExistentId}`, updatedRound, {
        headers: getUserHeaders(), // Use the helper function
      });
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/rounds/:id', () => {
    it('should delete an existing round', async () => {
      // Skip if no round was created
      if (!createdRoundId) {
        return;
      }

      const response = await apiClient.delete(`/api/rounds/${createdRoundId}`, {
        headers: getUserHeaders(), // Use the helper function
      });
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.status).toBe(200);

      expect(response.data.message).toBe('Round deleted.');
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).toBe(Number(createdRoundId));

      // Verify the round is actually deleted
      const verifyDeletedResponse = await apiClient.get(`/api/rounds/${createdRoundId}`, {
        headers: getUserHeaders(), // Use the helper function
      });
      expect(verifyDeletedResponse.status).toBe(404);
    });

    it.skip('should return 404 when deleting non-existent round', async () => {
      const nonExistentId = 'non-existent-id';

      const response = await apiClient.delete(`/api/rounds/${nonExistentId}`, {
        headers: getUserHeaders(), // Use the helper function
      });
      expect(response.status).toBe(404);
    });
  });

  // Clean up after all tests
  afterAll(async () => {
    await prisma.round.deleteMany({});
    await prisma.$disconnect();
  });
});
