import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IBrandService } from 'src/domain/abstractions/services/ibrand.service';
import { IBrand } from 'src/domain/abstractions/types/brand.type';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService implements IBrandService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<IBrand[]> {
    const brands = await this.prismaService.brand.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
    return brands;
  }

  async findOne(id: string): Promise<IBrand> {
    const brand = await this.prismaService.brand.findFirst({
      where: { id, deletedAt: null },
    });

    if (!brand) {
      throw new NotFoundException(`Marca com ID "${id}" não encontrada`);
    }

    return brand;
  }

  async create(
    createBrandDto: CreateBrandDto,
    userId: string,
  ): Promise<IBrand> {
    const existingByName = await this.prismaService.brand.findFirst({
      where: { name: createBrandDto.name, deletedAt: null },
    });

    if (existingByName) {
      throw new ConflictException(
        `Marca com nome "${createBrandDto.name}" já existe`,
      );
    }

    const existingBySlug = await this.prismaService.brand.findFirst({
      where: { slug: createBrandDto.slug, deletedAt: null },
    });

    if (existingBySlug) {
      throw new ConflictException(
        `Marca com slug "${createBrandDto.slug}" já existe`,
      );
    }

    const brand = await this.prismaService.brand.create({
      data: {
        name: createBrandDto.name,
        slug: createBrandDto.slug,
        active: createBrandDto.active ?? true,
        createdById: userId,
        updatedById: userId,
      },
    });

    return brand;
  }

  async update(
    id: string,
    updateBrandDto: UpdateBrandDto,
    userId: string,
  ): Promise<IBrand> {
    await this.findOne(id);

    if (updateBrandDto.name) {
      const existingByName = await this.prismaService.brand.findFirst({
        where: { name: updateBrandDto.name, id: { not: id }, deletedAt: null },
      });

      if (existingByName) {
        throw new ConflictException(
          `Marca com nome "${updateBrandDto.name}" já existe`,
        );
      }
    }

    if (updateBrandDto.slug) {
      const existingBySlug = await this.prismaService.brand.findFirst({
        where: { slug: updateBrandDto.slug, id: { not: id }, deletedAt: null },
      });

      if (existingBySlug) {
        throw new ConflictException(
          `Marca com slug "${updateBrandDto.slug}" já existe`,
        );
      }
    }

    const brand = await this.prismaService.brand.update({
      where: { id },
      data: {
        name: updateBrandDto.name,
        slug: updateBrandDto.slug,
        active: updateBrandDto.active,
        updatedById: userId,
      },
    });

    return brand;
  }

  async remove(id: string, userId: string): Promise<IBrand> {
    const brand = await this.prismaService.brand.findFirst({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException(`Marca com ID "${id}" não encontrada`);
    }

    if (brand.deletedAt !== null) {
      throw new BadRequestException(`Marca "${brand.name}" já está deletada`);
    }

    const deletedBrand = await this.prismaService.brand.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedById: userId,
      },
    });

    return deletedBrand;
  }

  async restore(id: string, userId: string): Promise<IBrand> {
    const brand = await this.prismaService.brand.findFirst({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException(`Marca com ID "${id}" não encontrada`);
    }

    if (brand.deletedAt === null) {
      throw new BadRequestException(`Marca "${brand.name}" não está deletada`);
    }

    const restoredBrand = await this.prismaService.brand.update({
      where: { id },
      data: {
        deletedAt: null,
        updatedById: userId,
      },
    });

    return restoredBrand;
  }
}
