import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { IAccountService } from 'src/domain/abstractions/services/iaccount.service';
import { IAccount } from 'src/domain/abstractions/types/account.type';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PaginationDto } from 'src/domain/shared/pagination/pagination.dto';
import { PaginationHelper } from 'src/domain/shared/helper/pagination.helper';

type UpdateUserData = {
  name?: string;
  email?: string;
};

@Injectable()
export class AccountService implements IAccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(paginationDto: PaginationDto): Promise<{
    data: IAccount[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = PaginationHelper.skip(page, limit);

    const [data, total] = await Promise.all([
      this.prismaService.user.findMany({
        where: { deletedAt: null },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          active: true,
          lastLogin: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      }),
      this.prismaService.user.count({
        where: { deletedAt: null },
      }),
    ]);

    return PaginationHelper.paginate(data, total, page, limit);
  }

  async findOne(id: string): Promise<IAccount> {
    const user = await this.prismaService.user.findFirst({
      where: { id, deletedAt: null },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Utilizador com ID "${id}" não encontrado`);
    }

    return user;
  }

  async findByName(
    name: string,
    paginationDto: PaginationDto,
  ): Promise<{
    data: IAccount[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = PaginationHelper.skip(page, limit);

    const [data, total] = await Promise.all([
      this.prismaService.user.findMany({
        where: {
          name: { contains: name, mode: 'insensitive' },
          deletedAt: null,
        },
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          active: true,
          lastLogin: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      }),
      this.prismaService.user.count({
        where: {
          name: { contains: name, mode: 'insensitive' },
          deletedAt: null,
        },
      }),
    ]);

    return PaginationHelper.paginate(data, total, page, limit);
  }

  async findMe(userId: string): Promise<IAccount> {
    return this.findOne(userId);
  }

  async create(createAccountDto: CreateAccountDto): Promise<IAccount> {
    const existingUser = await this.prismaService.user.findFirst({
      where: { email: createAccountDto.email, deletedAt: null },
    });

    if (existingUser) {
      throw new ConflictException(
        `Email "${createAccountDto.email}" já está em uso`,
      );
    }

    const hashedPassword = await bcrypt.hash(createAccountDto.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        name: createAccountDto.name,
        email: createAccountDto.email,
        password: hashedPassword,
        role: 'employee',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });

    return user;
  }

  async update(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<IAccount> {
    await this.findOne(id);

    if (updateAccountDto.email) {
      const existingUser = await this.prismaService.user.findFirst({
        where: {
          email: updateAccountDto.email,
          id: { not: id },
          deletedAt: null,
        },
      });

      if (existingUser) {
        throw new ConflictException(
          `Email "${updateAccountDto.email}" já está em uso`,
        );
      }
    }

    const updateData: UpdateUserData = {};

    if (updateAccountDto.name) {
      updateData.name = updateAccountDto.name;
    }

    if (updateAccountDto.email) {
      updateData.email = updateAccountDto.email;
    }

    const user = await this.prismaService.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });

    return user;
  }

  async remove(id: string): Promise<{ message: string; account: IAccount }> {
    const user = await this.prismaService.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Utilizador com ID "${id}" não encontrado`);
    }

    if (user.deletedAt !== null) {
      throw new BadRequestException(
        `Utilizador "${user.name}" já está deletado`,
      );
    }

    const deletedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });

    return {
      message: `Utilizador "${user.name}" foi deletado com sucesso`,
      account: deletedUser,
    };
  }

  async restore(id: string): Promise<{ message: string; account: IAccount }> {
    const user = await this.prismaService.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Utilizador com ID "${id}" não encontrado`);
    }

    if (user.deletedAt === null) {
      throw new BadRequestException(
        `Utilizador "${user.name}" não está deletado`,
      );
    }

    const restoredUser = await this.prismaService.user.update({
      where: { id },
      data: {
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });

    return {
      message: `Utilizador "${user.name}" foi restaurado com sucesso`,
      account: restoredUser,
    };
  }
}
