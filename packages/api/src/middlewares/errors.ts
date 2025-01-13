import { apiResponse } from '@/lib/api-response/index.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

function notFound() {
  throw ApiError.notFound();
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  console.error(err);

  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';
  let errorCode = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorCode = err.errorCode;
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError || err instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = 'Could not process request';
    errorCode = getReasonPhrase(StatusCodes.BAD_REQUEST);
  } else if (err && typeof err === 'object' && 'message' in err) {
    message = (err as Error).message;
  }

  apiResponse.error(res, statusCode, errorCode, message);
}

export default { notFound, errorHandler };
