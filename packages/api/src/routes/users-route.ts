import { usersController } from '@/controllers/users/controller.js';
import { Router } from 'express';

export const usersRouter = Router();

usersRouter.post('/grant-admin-role', usersController.grantAdminRole);

usersRouter.post('/revoke-admin-role', usersController.revokeAdminRole);

usersRouter.get('/', usersController.get);
