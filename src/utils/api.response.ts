// utils/api-response.util.ts
export class ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  status_code: number;   // <-- snake_case
  timestamp: string;

  constructor(
    message: string,
    options: {
      data?: T;
      success?: boolean;
      status_code?: number;
    } = {},
  ) {
    this.success = options.success ?? true;
    this.message = message;
    this.data = options.data;
    this.status_code = options.status_code ?? 200;
    this.timestamp = new Date().toISOString();
  }

  static success<T>(message: string, data?: T, status_code = 200) {
    return new ApiResponse<T>(message, { data, success: true, status_code });
  }

  static error(message: string, status_code = 400) {
    return new ApiResponse(message, { success: false, status_code });
  }
}
