import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
  public statusCode: number;
  public errorCode: string;

  constructor(statusCode: number, message: string = getReasonPhrase(statusCode)) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = getReasonPhrase(statusCode);
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  // Common errors
  static notFound(message?: string): ApiError {
    return new ApiError(StatusCodes.NOT_FOUND, message);
  }

  static badRequest(message?: string): ApiError {
    return new ApiError(StatusCodes.BAD_REQUEST, message);
  }

  static unauthorized(message?: string): ApiError {
    return new ApiError(StatusCodes.UNAUTHORIZED, message);
  }
}
