import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { AuthManager } from './auth-manager.js';
import { prisma } from '../prisma/instance.js';

if (!process.env.COGNITO_USER_POOL_ID || !process.env.COGNITO_USER_POOL_CLIENT) {
  throw new Error('Missing Cognito configs');
}

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  clientId: process.env.COGNITO_USER_POOL_CLIENT,
  tokenUse: 'id',
});

export const authManager = new AuthManager(jwtVerifier, prisma);
export { AuthManagerException } from './auth-manager.js';
export * from './types.js';
