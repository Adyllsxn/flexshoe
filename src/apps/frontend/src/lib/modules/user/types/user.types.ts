export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UpdateUserData {
  name: string;
  email: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}