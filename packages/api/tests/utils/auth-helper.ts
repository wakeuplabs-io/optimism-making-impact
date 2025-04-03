import * as crypto from 'crypto';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { vi } from 'vitest';

// Mock private key for signing tokens in tests
const MOCK_PRIVATE_KEY = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
}).privateKey;

// Mock public key for verification in tests
const MOCK_PUBLIC_KEY = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
}).publicKey;

// Mock JWKS for token verification
const MOCK_JWKS = {
  keys: [
    {
      kid: 'mock-kid',
      kty: 'RSA',
      n: MOCK_PUBLIC_KEY.export({ type: 'spki', format: 'der' }).toString('base64'),
      e: 'AQAB',
    },
  ],
};

// Types based on Cognito JWT payload structure
interface CognitoJwtPayload {
  sub: string;
  iss: string;
  client_id: string;
  origin_jti: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  username: string;
  email?: string;
  name: string;
  'cognito:groups'?: string[];
  'custom:role'?: string;
}
interface CognitoIdToken extends CognitoJwtPayload {
  'cognito:username': string;
  email: string;
  email_verified: boolean;
  name: string;
}
/**
 * Create a mock Cognito token with custom claims
 */
export function createMockToken(overrides: Partial<CognitoJwtPayload> = {}): string {
  const defaultPayload: CognitoJwtPayload = {
    sub: 'mock-user-id',
    iss: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_mockPool',
    client_id: 'mock-client-id',
    origin_jti: 'mock-origin-jti',
    event_id: 'mock-event-id',
    token_use: 'access',
    scope: 'aws.cognito.signin.user.admin',
    auth_time: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    iat: Math.floor(Date.now() / 1000),
    jti: 'mock-jti',
    username: 'mock-username',
    email: 'test@example.com',
    name: 'Test User',
    'cognito:groups': ['Users'],
    ...overrides,
  };

  return jwt.sign(defaultPayload, MOCK_PRIVATE_KEY, {
    algorithm: 'RS256',
    header: {
      kid: 'mock-kid',
      alg: 'RS256',
    },
  });
}
/**
 * Create a mock Cognito ID token with custom claims
 */
export function createMockIdToken(overrides: Partial<CognitoIdToken> = {}): string {
  const defaultPayload: CognitoIdToken = {
    sub: 'mock-user-id',
    iss: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_mockPool',
    client_id: 'mock-client-id',
    origin_jti: 'mock-origin-jti',
    event_id: 'mock-event-id',
    token_use: 'id',
    scope: 'aws.cognito.signin.user.admin',
    auth_time: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    iat: Math.floor(Date.now() / 1000),
    jti: 'mock-jti',
    username: 'mock-username',
    'cognito:username': 'mock-username',
    'cognito:groups': ['Users'],
    email: 'test@example.com',
    email_verified: true,
    name: 'Test User',
    ...overrides,
  };

  return jwt.sign(defaultPayload, MOCK_PRIVATE_KEY, {
    algorithm: 'RS256',
    header: {
      kid: 'mock-kid',
      alg: 'RS256',
    },
  });
}
/**
 * Create a request with an Authorization header containing a bearer token
 */
export function createRequestWithToken(token: string): Request {
  const req = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  } as Request;

  return req;
}
/**
 * Create an admin user token
 */
export function createAdminToken(): string {
  return createMockToken({
    'cognito:groups': ['Admins'],
    'custom:role': 'admin',
    username: 'admin-user',
    name: 'Admin User',
    email: 'admin@example.com',
  });
}
/**
 * Create a regular user token
 */
export function createUserToken(): string {
  return createMockToken({
    'cognito:groups': ['Users'],
    'custom:role': 'user',
    username: 'regular-user',
    name: 'Regular User',
    email: 'user@example.com',
  });
}
/**
 * Set up Vitest mocks for AWS Cognito verification
 */
export function setupTestAuth() {
  // Clear mocks before setting them up
  vi.resetAllMocks();

  // Mock AWS Cognito client
  vi.mock('@aws-sdk/client-cognito-identity-provider', () => {
    return {
      CognitoIdentityProviderClient: vi.fn().mockImplementation(() => {
        return {
          send: vi.fn().mockResolvedValue({
            UserAttributes: [
              { Name: 'email', Value: 'test@example.com' },
              { Name: 'custom:role', Value: 'user' },
            ],
          }),
        };
      }),
      GetUserCommand: vi.fn(),
    };
  });

  // Mock the JWT verification process
  vi.mock('jsonwebtoken', async () => {
    const actual = await vi.importActual('jsonwebtoken');
    return {
      ...actual,
      verify: vi.fn().mockImplementation((token, _secretOrPublicKey, _options, callback) => {
        try {
          // Use the real jwt.decode for test tokens
          const decoded = jwt.decode(token);
          if (!decoded) {
            throw new Error('Invalid token');
          }

          // Verify the kid matches our mock JWKS
          const header = jwt.decode(token, { complete: true })?.header;
          if (!header || header.kid !== 'mock-kid') {
            throw new Error('Invalid kid');
          }

          return callback ? callback(null, decoded) : decoded;
        } catch (err) {
          return callback ? callback(err) : null;
        }
      }),
    };
  });

  // Mock jwks-rsa package
  vi.mock('jwks-rsa', () => {
    return {
      JwksClient: vi.fn().mockImplementation(() => ({
        getSigningKey: vi.fn().mockImplementation(async (kid) => {
          if (kid === 'mock-kid') {
            return {
              getPublicKey: () => MOCK_PUBLIC_KEY.export({ type: 'spki', format: 'pem' }),
            };
          }
          throw new Error('Invalid kid');
        }),
      })),
    };
  });

  // Mock PrismaClient for the userWhitelist lookup that determines admin status
  vi.mock('@optimism-making-impact/prisma', () => {
    const mockPrismaClient = () => {
      const client = {
        userWhitelist: {
          findUnique: vi.fn().mockImplementation(({ where }) => {
            // Return admin status based on email
            if (where.email === 'admin@example.com') {
              return Promise.resolve({ whiteListed: true });
            } else {
              return Promise.resolve({ whiteListed: false });
            }
          }),
        },
        round: {
          deleteMany: vi.fn().mockResolvedValue({ count: 1 }),
          findMany: vi.fn().mockResolvedValue([]),
          findUnique: vi.fn().mockResolvedValue(null),
          findFirst: vi.fn().mockImplementation(({ orderBy }) => {
            // Return the last round for findFirst with orderBy
            if (orderBy?.id === 'desc') {
              return Promise.resolve({ id: 1 });
            }
            return Promise.resolve(null);
          }),
          create: vi.fn().mockImplementation((data) => Promise.resolve({ id: 1, ...data.data })),
          update: vi.fn().mockImplementation(({ where, data }) => Promise.resolve({ id: where.id, ...data })),
          delete: vi.fn().mockImplementation(({ where }) => Promise.resolve({ id: where.id })),
        },
        category: {
          findMany: vi.fn().mockResolvedValue([]),
        },
        $disconnect: vi.fn().mockResolvedValue(undefined),
      };
      return client;
    };

    return {
      PrismaClient: vi.fn().mockImplementation(mockPrismaClient),
    };
  });

  // Mock the auth module to use our test verification instead of real Cognito
  vi.mock('../src/lib/auth', async () => {
    const actual = await vi.importActual('../src/lib/api-error.js');
    const ApiError = (actual as any).ApiError;

    // Create a mock implementation of the authManager
    const mockAuthManager = {
      authenticate: vi.fn().mockImplementation(async (token) => {
        console.log('Auth mock received token:', token); // Debug log

        // Check if the token is a valid string
        if (!token || typeof token !== 'string') {
          console.log('Token validation failed: missing or not a string'); // Debug log
          throw ApiError.unauthorized('Missing or empty authorization token');
        }

        // For Bearer token format, extract the token
        let actualToken = token;
        if (token.startsWith('Bearer ')) {
          actualToken = token.substring(7);
        }
        console.log('Extracted token:', actualToken); // Debug log

        try {
          // Parse the token content and verify the kid
          const decoded = jwt.decode(actualToken);
          const header = jwt.decode(actualToken, { complete: true })?.header;

          console.log('Token header:', header); // Debug log
          console.log('Decoded token payload:', decoded); // Debug log

          // If token is invalid or malformed
          if (!decoded || !header || header.kid !== 'mock-kid') {
            console.log('Token validation failed: invalid kid or could not decode token'); // Debug log
            if (token === 'invalid-token-format') {
              throw ApiError.unauthorized('Invalid token format');
            }
            throw ApiError.unauthorized('Token validation failed');
          }

          // Handle expired token
          const payload = decoded as any;
          if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
            console.log('Token validation failed: token expired'); // Debug log
            throw ApiError.unauthorized('Token expired');
          }

          // Handle test-specific tokens
          const email = payload.email || 'test@example.com';

          console.log('Checking token roles:', {
            customRole: payload['custom:role'],
            cognitoGroups: payload['cognito:groups'],
          }); // Debug log

          // For createUserToken() - check for user role in payload
          if (
            payload['custom:role'] === 'user' ||
            (payload['cognito:groups'] && Array.isArray(payload['cognito:groups']) && payload['cognito:groups'].includes('Users'))
          ) {
            console.log('Token validated as regular user'); // Debug log
            return {
              name: 'Regular User',
              email: 'user@example.com',
              authToken: actualToken,
              isAdmin: false, // Regular user is NOT admin
            };
          }

          // For createAdminToken() - check for admin role in payload
          if (
            payload['custom:role'] === 'admin' ||
            (payload['cognito:groups'] && Array.isArray(payload['cognito:groups']) && payload['cognito:groups'].includes('Admins'))
          ) {
            console.log('Token validated as admin user'); // Debug log
            return {
              name: 'Admin User',
              email: 'admin@example.com',
              authToken: actualToken,
              isAdmin: true, // Admin user IS admin
            };
          }

          console.log('Token validated as default user'); // Debug log
          // Default for other tokens
          return {
            name: payload.name || payload.username || 'Test User',
            email: email,
            authToken: actualToken,
            isAdmin: false,
          };
        } catch (error) {
          console.log('Token validation error:', error); // Debug log
          throw new Error('Token validation failed');
        }
      }),
      verifyToken: vi.fn().mockImplementation(async (token) => {
        console.log('verifyToken called with:', token); // Debug log
        const decoded = jwt.decode(token);
        if (!decoded) {
          throw new Error('Invalid token');
        }
        return decoded;
      }),
      getJwks: vi.fn().mockResolvedValue(MOCK_JWKS),
    };

    return {
      authManager: mockAuthManager,
      extractToken: vi.fn().mockImplementation((req) => {
        console.log('extractToken called with headers:', req.headers); // Debug log
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return null;
        }
        return authHeader.substring(7); // Remove 'Bearer ' prefix
      }),
    };
  });

  // Return the mocked module to make testing easier
  return {
    getAdminHeaders,
    getUserHeaders,
    createAdminToken,
    createUserToken,
  };
}

/**
 * Helper to include auth headers in supertest requests
 */
export function addAuthHeader(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Get headers for an admin user
 */
export function getAdminHeaders() {
  const token = createAdminToken();
  return addAuthHeader(token);
}

/**
 * Get headers for a regular user
 */
export function getUserHeaders() {
  const token = createUserToken();
  return addAuthHeader(token);
}
