export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  data: {
    id: string;
    email: string;
    name: string;
    role: string;
    tokenExpires: string;
  };
}

export interface AuthCheckResponse {
  authenticated: boolean;
  user: null | {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

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

export interface LogoutResponse {
  message: string;
}