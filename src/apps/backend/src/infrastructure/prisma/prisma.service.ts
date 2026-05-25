import 'dotenv/config';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'src/infrastructure/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private dbConnected = false;

  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$queryRaw`SELECT 1`;
      this.dbConnected = true;
      Logger.log('✅ Database connection established');
    } catch {
      this.dbConnected = false;
      Logger.warn(
        '⚠️ Database connection failed - API running without database',
      );
    }
  }

  isConnected(): boolean {
    return this.dbConnected;
  }
}
