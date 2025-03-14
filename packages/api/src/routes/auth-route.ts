import { authController } from '@/controllers/auth/controller.js';
import { Router } from 'express';

export const authRouter = Router();

authRouter.post('/validate', authController.validate);
