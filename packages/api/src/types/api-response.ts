export interface ApiErrorResponse {
  success: false;
  status: number;
  error: {
    code: string;
    message: string;
  };
}
