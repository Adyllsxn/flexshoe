import { UserRole } from './base/common.type';

export type IAccount = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type IAccountWithPassword = IAccount & {
  password: string;
};
