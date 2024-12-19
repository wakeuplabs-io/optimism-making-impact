import { sendSuccessResponse } from '@/lib/api-response/send-success-response.js';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    sendSuccessResponse(res, { message: 'Hello World from github!' });
  } catch (error) {
    next(error);
  }
});

export default router;
