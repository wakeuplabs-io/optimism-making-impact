import { apiResponse } from '@/lib/api-response/index.js';
import { authManager, AuthManagerException } from '@/lib/auth/index.js';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

async function validateAdmin(req: Request, res: Response, next: NextFunction) {
  if (!['POST', 'PUT', 'DELETE'].includes(req.method) || req.path.includes('/auth')) {
    next();
    return;
  }

  //authenticate user
  const authToken = req.headers.authorization;

  if (!authToken) {
    apiResponse.error(res, StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED', 'Missing authorization token');
    return;
  }

  try {
    const authUser = await authManager.authenticate(authToken);

    if (!authUser.isAdmin) {
      apiResponse.error(res, StatusCodes.FORBIDDEN, 'FORBIDDEN', 'Your account does not have admin privileges');
      return;
    }
    next();
  } catch (error) {
    if (error instanceof AuthManagerException) {
      apiResponse.error(res, StatusCodes.UNAUTHORIZED, 'UNAUTHORIZED', 'Invalid authorization token');
      return;
    }

    apiResponse.error(res, StatusCodes.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR', 'Internal Server Error');
  }
}

export default { validateAdmin };
