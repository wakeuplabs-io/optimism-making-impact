import { PrismaClient } from '@prisma/client';
import { AuthenticatedUser, CognitoJwtVerifier } from './types.js';

export class AuthManagerException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthManagerException';
  }
}

export class AuthManager {
  constructor(
    private cognitoJWTVerifier: CognitoJwtVerifier,
    private prismaClient: PrismaClient,
  ) {}

  public async authenticate(authToken: string): Promise<AuthenticatedUser> {
    //validate token
    const payload = await this.verifyToken(authToken);

    const name = payload['name'] as string;
    const email = payload['email'] as string;

    //check if user has admin permissions
    const userWhitelisting = await this.prismaClient.userWhitelist.findUnique({
      where: {
        email,
      },
    });

    return {
      name,
      email,
      authToken,
      isAdmin: userWhitelisting?.whiteListed ?? false,
    };
  }

  private async verifyToken(token: string) {
    try {
      const payload = await this.cognitoJWTVerifier.verify(token);
      return payload;
    } catch (error) {
      console.error(error);
      throw new AuthManagerException('Token validation failed');
    }
  }
}
