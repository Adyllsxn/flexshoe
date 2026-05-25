import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';

@Module({
  controllers: [PasswordController],
  providers: [PasswordService],
})
export class PasswordModule {}
