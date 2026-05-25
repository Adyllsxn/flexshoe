import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/infrastructure/generated/prisma/enums';

export const AdminOrEmployee = () =>
  SetMetadata('roles', [UserRole.admin, UserRole.employee]);
