import { ApiError } from '@/lib/api-error.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { prisma } from '@/lib/prisma-instance.js';
import { userSchema } from '@optimism-making-impact/schemas';
import { NextFunction, Request, Response } from 'express';

async function grantAdminRole(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = userSchema.safeParse(req.body);

    if (!parsed.success) throw ApiError.badRequest();
    await prisma.userWhitelist.create({
      data: {
        email: parsed.data.email,
        whiteListed: true,
      },
    });
    return apiResponse.success(res, { message: 'Admin role granted successfully.' });
  } catch (error) {
    next(error);
  }
}

async function revokeAdminRole(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = userSchema.safeParse(req.body);
    // Prevent revoking admin role for current user
    if (!parsed.success) throw ApiError.badRequest();
    if (parsed.data.email === req.app.locals.authUser.email) throw ApiError.unauthorized('You cannot revoke your own admin role.');
    await prisma.userWhitelist.delete({
      where: {
        email: parsed.data.email,
      },
    });
    return apiResponse.success(res, { message: 'Admin role revoked successfully.' });
  } catch (error) {
    next(error);
  }
}

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const role = req.query.role;
    const users = role
      ? await prisma.userWhitelist.findMany({ where: { whiteListed: role === 'admin' } })
      : await prisma.userWhitelist.findMany();

    const mappedUsers = users.map((user) => ({
      email: user.email,
      role: user.whiteListed ? 'admin' : 'user',
    }));
    return apiResponse.success(res, { users: mappedUsers });
  } catch (error) {
    next(error);
  }
}

export const usersController = {
  grantAdminRole,
  revokeAdminRole,
  get,
};
