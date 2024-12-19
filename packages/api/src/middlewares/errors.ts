import { sendErrorResponse } from '@/lib/api-response/send-error-response.js';
import { ApiError } from '@/lib/errors/api-error.js';
import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

function notFound() {
  throw ApiError.notFound();
}

export function errorHandler(err: unknown, _: Request, res: Response, next: NextFunction): void {
  console.error(err);

  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';
  let errorCode = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorCode = err.errorCode;
  } else if (err && typeof err === 'object' && 'message' in err) {
    message = (err as Error).message;
  }

  sendErrorResponse(res, statusCode, errorCode, message);
}

export default { notFound, errorHandler };
