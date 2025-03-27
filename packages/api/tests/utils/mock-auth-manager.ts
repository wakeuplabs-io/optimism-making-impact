import { AuthManagerException } from '@/lib/auth/auth-manager.js';
import { AuthenticatedUser } from '@/lib/auth/types.js';
import { PrismaClient } from '@optimism-making-impact/prisma';
import jwt from 'jsonwebtoken';

/**
 * Mock implementation of AuthManager for testing purposes
 * This replaces the real auth-manager.ts that uses CognitoJwtVerifier
 * to avoid hitting actual AWS services during tests
 */
export class MockAuthManager {
  private prismaClient: PrismaClient;

  constructor(prismaClient?: PrismaClient) {
    // Use provided prisma client or create a mock one
    this.prismaClient =
      prismaClient ||
      ({
        userWhitelist: {
          findUnique: async ({ where }: { where: { email: string } }) => {
            // For testing purposes, we'll consider admin@example.com to be whitelisted
            if (where.email === 'admin@example.com') {
              return { whiteListed: true };
            }
            return { whiteListed: false };
          },
        },
      } as unknown as PrismaClient);
  }

  /**
   * Authenticate a user based on their JWT token
   * This is a mocked version that doesn't use real AWS Cognito services
   */
  public async authenticate(authToken: string): Promise<AuthenticatedUser> {
    try {
      // Simulate failures for specific test cases
      if (authToken === 'invalid-token-format') {
        throw new AuthManagerException('Invalid token format');
      }
      if (authToken === 'expired-token') {
        throw new AuthManagerException('Token expired');
      }

      // Decode the token without validation (for testing only)
      const decoded = jwt.decode(authToken, { complete: true });
      if (!decoded) {
        throw new AuthManagerException('Invalid token format');
      }

      // Extract user information from token payload
      const payload = decoded.payload as any;
      const email = payload.email || 'test@example.com';
      const name = payload.name || 'Test User';
      const customRole = payload['custom:role'];
      const cognitoGroups = payload['cognito:groups'] || [];

      // Determine admin status based on role or group membership
      const isAdmin = customRole === 'admin' || cognitoGroups.includes('Admins') || email === 'admin@example.com';

      // Log for debugging tests
      console.log(`Token validated for ${email} (admin: ${isAdmin})`);

      return {
        name,
        email,
        isAdmin,
        authToken,
      };
    } catch (error) {
      console.error('Authentication error:', error);
      if (error instanceof AuthManagerException) {
        throw error;
      }
      throw new AuthManagerException('Token validation failed');
    }
  }

  /**
   * Mock token verification - no real AWS verification happens here
   * This is intentionally simplified for testing purposes
   */
  public async verifyToken(token: string): Promise<any> {
    try {
      const decoded = jwt.decode(token, { complete: true });
      if (!decoded) {
        throw new AuthManagerException('Invalid token format');
      }

      // Perform basic validation
      const payload = decoded.payload as any;
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        throw new AuthManagerException('Token expired');
      }

      return payload;
    } catch (error) {
      console.error('Token verification error:', error);
      if (error instanceof AuthManagerException) {
        throw error;
      }
      throw new AuthManagerException('Token validation failed');
    }
  }
}

// Export a singleton instance for use in tests
export const mockAuthManager = new MockAuthManager();
