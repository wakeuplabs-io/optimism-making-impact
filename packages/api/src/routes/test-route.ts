import { apiResponse } from '@/lib/api-response/index.js';
import { NextFunction, Request, Response, Router } from 'express';

export const testRouter = Router();

testRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Hello World from github');
    apiResponse.success(res, { message: 'Hello World from github!' });
  } catch (error) {
    next(error);
  }
});
