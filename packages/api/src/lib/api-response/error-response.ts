import { ApiErrorResponse } from '@/types/api-response.js';
import { Response } from 'express';

/**
 * Sends a standardized error response.
 *
 * @param res - Express Response object
 * @param status - HTTP status code
 * @param code - Short error code
 * @param message - Detailed error message
 */
export const sendErrorResponse = (res: Response, status: number, code: string, message: string): void => {
  const errorResponse: ApiErrorResponse = {
    success: false,
    status,
    error: {
      code,
      message,
    },
  };

  res.status(status).json(errorResponse);
};
