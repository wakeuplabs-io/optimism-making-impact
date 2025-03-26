import axios from 'axios';

// API server configuration
const API_URL = 'http://localhost:5100';

/**
 * Get the base URL of the real API server
 * @returns {string} The base URL of the API server
 */
export function getRealServerUrl(): string {
  return API_URL;
}

/**
 * Checks if the server is ready by making a request to the API
 * @returns {Promise<boolean>} A promise that resolves to true if the server is ready
 */
export async function isServerReady(): Promise<boolean> {
  try {
    await axios.get(`${API_URL}/api/test`);
    return true;
  } catch (error) {
    console.error('API server is not available on localhost:5100. Make sure to start it using "pnpm dev" before running tests.');
    return false;
  }
}

/**
 * Creates an axios instance configured for the real API server
 * @returns {import('axios').AxiosInstance} An axios instance
 */
export function createApiClient() {
  return axios.create({
    baseURL: API_URL,
    validateStatus: () => true, // Don't throw on any status code
  });
}

/**
 * Example usage:
 *
 * import { isServerReady, createApiClient } from './utils/real-server';
 *
 * beforeAll(async () => {
 *   // Check if the server is already running
 *   expect(await isServerReady()).toBe(true);
 * });
 *
 * it('should connect to the real API', async () => {
 *   const apiClient = createApiClient();
 *   const response = await apiClient.get('/api/some-endpoint');
 *   expect(response.status).toBe(200);
 * });
 */
