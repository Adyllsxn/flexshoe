export interface Role {
  name: string;
  description: string;
}

export interface RolesResponse {
  roles: string[];
  description: Record<string, string>;
  total: number;
}

export interface UserPermission {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UpdateRoleRequest {
  userId: string;
  role: string;
}

export interface UpdateRoleResponse {
  message: string;
  user: UserPermission;
}