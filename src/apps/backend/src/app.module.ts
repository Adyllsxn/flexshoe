import { Module } from '@nestjs/common';
import { SystemModule } from './presentation/modules/system/system.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';

@Module({
  imports: [SystemModule, PrismaModule],
})
export class AppModule {}
