import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IStoreService } from 'src/domain/abstractions/services/istore.service';
import { IStore } from 'src/domain/abstractions/types/store.type';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService implements IStoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(): Promise<IStore> {
    const store = await this.prismaService.store.findFirst();

    if (!store) {
      throw new NotFoundException('Configurações da loja não encontradas');
    }

    return store;
  }

  async update(updateStoreDto: UpdateStoreDto): Promise<IStore> {
    const store = await this.prismaService.store.findFirst();

    if (!store) {
      throw new NotFoundException('Configurações da loja não encontradas');
    }

    const updateData: Partial<IStore> = {};

    if (updateStoreDto.name !== undefined) {
      updateData.name = updateStoreDto.name;
    }
    if (updateStoreDto.whatsapp !== undefined) {
      updateData.whatsapp = updateStoreDto.whatsapp;
    }
    if (updateStoreDto.email !== undefined) {
      updateData.email = updateStoreDto.email;
    }
    if (updateStoreDto.address !== undefined) {
      updateData.address = updateStoreDto.address;
    }
    if (updateStoreDto.primaryColor !== undefined) {
      updateData.primaryColor = updateStoreDto.primaryColor;
    }

    return await this.prismaService.store.update({
      where: { id: store.id },
      data: updateData,
    });
  }
}