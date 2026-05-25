export type UserRole = 'admin' | 'employee';

export type ApiResponse<T> = {
  message: string;
  data?: T;
};