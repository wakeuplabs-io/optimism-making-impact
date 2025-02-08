import { CognitoIdTokenPayload } from 'aws-jwt-verify/jwt-model';

export interface AuthenticatedUser {
  isAdmin: boolean;
  name: string;
  email: string;
  authToken: string;
}

export interface CognitoJwtVerifier {
  verify: (token: string) => Promise<CognitoIdTokenPayload>;
}
