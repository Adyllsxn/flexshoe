import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/infrastructure/generated/prisma/enums';

export const AdminOnly = () => SetMetadata('roles', [UserRole.admin]);
