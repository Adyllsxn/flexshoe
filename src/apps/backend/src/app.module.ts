import { Module } from '@nestjs/common';
import { SystemModule } from './presentation/modules/system/system.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { PermissionModule } from './presentation/modules/identity/permission/permission.module';
import { PasswordModule } from './presentation/modules/identity/password/password.module';
import { AuthModule } from './presentation/modules/identity/auth/auth.module';
import { AccountModule } from './presentation/modules/identity/account/account.module';
import { StoreModule } from './presentation/modules/business/store/store.module';
import { BrandModule } from './presentation/modules/business/brand/brand.module';
import { ProductModule } from './presentation/modules/business/product/product.module';
import { InventoryModule } from './presentation/modules/business/inventory/inventory.module';
import { CartModule } from './presentation/modules/business/cart/cart.module';

@Module({
  imports: [
    SystemModule,
    PrismaModule,
    PermissionModule,
    PasswordModule,
    AuthModule,
    AccountModule,
    StoreModule,
    BrandModule,
    ProductModule,
    InventoryModule,
    CartModule,
  ],
})
export class AppModule {}
