import { Module } from '@nestjs/common';
import { SystemModule } from './presentation/modules/system/system.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { PermissionModule } from './presentation/modules/identity/permission/permission.module';
import { PasswordModule } from './presentation/modules/identity/password/password.module';
import { AuthModule } from './presentation/modules/identity/auth/auth.module';
import { AccountModule } from './presentation/modules/identity/account/account.module';

@Module({
  imports: [
    SystemModule,
    PrismaModule,
    PermissionModule,
    PasswordModule,
    AuthModule,
    AccountModule,
  ],
})
export class AppModule {}
