import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IPermissionService } from 'src/domain/abstractions/services/ipermission.service';
import { IUserRole, IRoleListResponse, UserRole } from 'src/domain/abstractions/types/permission.type';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class PermissionService implements IPermissionService {
  constructor(private readonly prismaService: PrismaService) {}

  listRoles(): IRoleListResponse {
    const roles: UserRole[] = ['admin', 'employee'];

    const description: Record<UserRole, string> = {
      admin: 'Administrador com acesso total ao sistema',
      employee: 'Funcionário com acesso limitado ao sistema',
    };

    return {
      roles,
      description,
      total: roles.length,
    };
  }

  async getUserRole(id: string): Promise<IUserRole> {
    const user = await this.prismaService.user.findFirst({
      where: { id, deletedAt: null },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Utilizador com ID "${id}" não encontrado`);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
    };
  }

  async updateUserRole(
    updateRoleDto: UpdateRoleDto,
  ): Promise<{ message: string; user: IUserRole }> {
    const { userId, role } = updateRoleDto;

    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(
        `Utilizador com ID "${userId}" não encontrado`,
      );
    }

    if (user.deletedAt !== null) {
      throw new BadRequestException(
        'Não é possível alterar role de um utilizador deletado',
      );
    }

    console.log(
      `🔐 ROLE CHANGE: User ${user.email} (${userId}) - Old: ${user.role} -> New: ${role} at ${new Date().toISOString()}`,
    );

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        role: role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return {
      message: `Role alterada com sucesso ✅`,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role as UserRole,
      },
    };
  }
}