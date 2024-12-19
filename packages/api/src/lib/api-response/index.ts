import { sendErrorResponse } from './error-response.js';
import { sendSuccessResponse } from './success-response.js';

/**
 * API response utility with standardized success and error responses.
 */
export const apiResponse = {
  /**
   * Sends a standardized success response.
   * @see sendSuccessResponse
   */
  success: sendSuccessResponse,

  /**
   * Sends a standardized error response.
   * @see sendErrorResponse
   */
  error: sendErrorResponse,
};
