import { apiResponse } from '@/lib/api-response/index.js';
import { AuthManagerException } from '@/lib/auth/auth-manager.js';
import { authManager } from '@/lib/auth/index.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const adminRequiredMethods = ['POST', 'PUT', 'DELETE'];

async function validateAdmin(req: Request, res: Response, next: NextFunction) {
  if (!adminRequiredMethods.includes(req.method) || req.path.includes('/auth')) {
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
    req.app.locals.authUser = authUser;
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
