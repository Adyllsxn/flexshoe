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
    return await this.prismaService.brand.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string): Promise<IBrand> {
    const brand = await this.prismaService.brand.findFirst({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException(`Marca com ID "${id}" não encontrada`);
    }

    return brand;
  }

  async create(createBrandDto: CreateBrandDto, userId: string): Promise<IBrand> {
    const existingByName = await this.prismaService.brand.findFirst({
      where: { name: createBrandDto.name },
    });

    if (existingByName) {
      throw new ConflictException(`Marca com nome "${createBrandDto.name}" já existe`);
    }

    const existingBySlug = await this.prismaService.brand.findFirst({
      where: { slug: createBrandDto.slug },
    });

    if (existingBySlug) {
      throw new ConflictException(`Marca com slug "${createBrandDto.slug}" já existe`);
    }

    return await this.prismaService.brand.create({
      data: {
        name: createBrandDto.name,
        slug: createBrandDto.slug,
        active: createBrandDto.active ?? true,
        createdById: userId,
        updatedById: userId,
      },
    });
  }

  async update(
    id: string,
    updateBrandDto: UpdateBrandDto,
    userId: string,
  ): Promise<IBrand> {
    await this.findOne(id);

    if (updateBrandDto.name) {
      const existingByName = await this.prismaService.brand.findFirst({
        where: { name: updateBrandDto.name, id: { not: id } },
      });

      if (existingByName) {
        throw new ConflictException(`Marca com nome "${updateBrandDto.name}" já existe`);
      }
    }

    if (updateBrandDto.slug) {
      const existingBySlug = await this.prismaService.brand.findFirst({
        where: { slug: updateBrandDto.slug, id: { not: id } },
      });

      if (existingBySlug) {
        throw new ConflictException(`Marca com slug "${updateBrandDto.slug}" já existe`);
      }
    }

    return await this.prismaService.brand.update({
      where: { id },
      data: {
        name: updateBrandDto.name,
        slug: updateBrandDto.slug,
        active: updateBrandDto.active,
        updatedById: userId,
      },
    });
  }

  async remove(id: string, userId: string): Promise<IBrand> {
    const brand = await this.prismaService.brand.findFirst({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException(`Marca com ID "${id}" não encontrada`);
    }

    return await this.prismaService.brand.delete({
      where: { id },
    });
  }

  async restore(id: string, userId: string): Promise<IBrand> {
    // Como não tem soft delete, retorna erro
    throw new BadRequestException('Marcas não suportam restauração');
  }
}