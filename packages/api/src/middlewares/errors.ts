import { ApiError } from '@/lib/api-error.js';
import { apiResponse } from '@/lib/api-response/index.js';
import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

function notFound() {
  throw ApiError.notFound();
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  console.error(err);

  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';
  let errorCode = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorCode = err.errorCode;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      message = `Unique constraint failed on the fields: ${err.meta?.target}`;
    }
    if (err.code === 'P2003' && req.method === 'DELETE') {
      const modelName = err.meta?.modelName && typeof err.meta.modelName === 'string' ? err.meta.modelName : 'record';
      message = `Can't delete ${modelName.toLowerCase()} before deleting its related records.`;
    }
    statusCode = StatusCodes.BAD_REQUEST;
  } else if (
    err instanceof Prisma.PrismaClientUnknownRequestError ||
    err instanceof Prisma.PrismaClientValidationError ||
    err instanceof Prisma.PrismaClientRustPanicError
  ) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = 'An error occurred while processing the request.';
  } else if (err && typeof err === 'object' && 'message' in err) {
    message = (err as Error).message;
  }

  errorCode = getReasonPhrase(statusCode);
  apiResponse.error(res, statusCode, errorCode, message);
}

export default { notFound, errorHandler };
