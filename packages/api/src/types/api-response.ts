export interface ApiErrorResponse {
  success: false;
  status: number;
  error: {
    code: string;
    message: string;
  };
}

export type ApiSuccessResponseData = Record<string, unknown>;
export interface SuccessResponse<T extends ApiSuccessResponseData> {
  success: true;
  status: number;
  code: string;
  timestamp: string;
  data: T;
}
