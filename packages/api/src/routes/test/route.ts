import { apiResponse } from '@/lib/api-response/index.js';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    apiResponse.success(res, { message: 'Hello World from github!' });
  } catch (error) {
    next(error);
  }
});

export default router;
