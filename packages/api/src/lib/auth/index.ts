import { prisma } from '../prisma/instance.js';
import { AuthManager } from './auth-manager.js';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

if (!process.env.COGNITO_USER_POOL_ID || !process.env.COGNITO_USER_POOL_CLIENT) {
  throw new Error('Missing Cognito configs');
}

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  clientId: process.env.COGNITO_USER_POOL_CLIENT,
  tokenUse: 'id',
});

export const authManager = new AuthManager(jwtVerifier, prisma);
