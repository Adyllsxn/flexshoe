import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { StorageModule } from 'src/infrastructure/storage/storage.module';

@Module({
  imports: [PrismaModule, StorageModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
