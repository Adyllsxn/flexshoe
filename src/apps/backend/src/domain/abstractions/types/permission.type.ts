import { UserRole } from './base/common.type';

export type IUserRole = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type IRoleInfo = {
  role: UserRole;
  description: string;
};

export type IRoleListResponse = {
  roles: UserRole[];
  description: Record<UserRole, string>;
  total: number;
};