import { UserRole } from './base/common.type';

export type ILoginResponse = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  token: string;
  tokenExpires: Date;
};

export type ICheckAuthResponse = {
  authenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  } | null;
};

export type ILogoutResponse = {
  message: string;
};

export type IJwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};

export type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};
