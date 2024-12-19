import { ApiSuccessResponseData, SuccessResponse } from '@/types/api-response.js'; // Adjust the import path as needed
import { Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';

/**
 * Sends a standardized success response.
 *
 * @param res - Express Response object
 * @param data - Data returned by the API
 * @param status - HTTP status code
 */
export const sendSuccessResponse = <T extends ApiSuccessResponseData>(res: Response, data: T, status: number = 200): void => {
  const successResponse: SuccessResponse<T> = {
    success: true,
    status,
    code: getReasonPhrase(status),
    timestamp: new Date().toISOString(),
    data,
  };

  res.status(status).json(successResponse);
};
