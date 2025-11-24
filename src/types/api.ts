export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export enum ApiStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
