import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import * as os from 'os';

@Injectable()
export class SystemService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'FlexShoe API - E-commerce de Tênis com WhatsApp';
  }

  getSystemInfo() {
    const memoryUsage = process.memoryUsage().rss / 1024 / 1024;
    const uptime = process.uptime();

    return {
      application: 'FlexShoe API',
      version: '1.0.0',
      description: 'E-commerce de tênis com finalização no WhatsApp',
      environment: process.env.NODE_ENV ?? 'development',
      server: os.hostname(),
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(uptime / 86400)}d ${Math.floor((uptime % 86400) / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`,
      memoryUsage: `${memoryUsage.toFixed(2)} MB`,
      cpu: {
        cores: os.cpus().length,
        model: os.cpus()[0]?.model || 'Unknown',
        loadAverage: os.loadavg(),
      },
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
    };
  }

  async getHealth() {
    let dbHealthy = true;
    let dbError: string | null = null;

    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch (error) {
      dbHealthy = false;
      if (error instanceof Error) {
        dbError = error.message;
      } else {
        dbError = 'Unknown database error';
      }
    }

    const healthData = {
      status: dbHealthy ? 'healthy' : 'unhealthy',
      application: 'FlexShoe API',
      version: '1.0.0',
      environment: process.env.NODE_ENV ?? 'development',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
      database: dbHealthy ? 'connected' : 'disconnected',
    };

    if (!dbHealthy) {
      return {
        ...healthData,
        dbError,
      };
    }

    return healthData;
  }
}