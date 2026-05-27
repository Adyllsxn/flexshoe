import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}