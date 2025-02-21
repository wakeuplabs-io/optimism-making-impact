import { authController } from '@/controllers/auth/controller.js';
import { Router } from 'express';

// TODO: remove the folder, is just one file

export const authRouter = Router();

authRouter.post('/validate', authController.validate);
