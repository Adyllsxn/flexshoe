import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class RateLimitGuard implements CanActivate {
  private attempts = new Map<string, { count: number; firstAttempt: number }>();
  private readonly limit = 5;
  private readonly ttl = 60000; // 1 minuto

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const ip = request.ip ?? request.socket?.remoteAddress ?? 'unknown';
    const now = Date.now();

    const record = this.attempts.get(ip);

    if (record) {
      if (now - record.firstAttempt > this.ttl) {
        this.attempts.set(ip, { count: 1, firstAttempt: now });
        return true;
      }

      if (record.count >= this.limit) {
        throw new HttpException(
          'Muitas tentativas. Aguarde um momento.',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }

      record.count++;
      this.attempts.set(ip, record);
    } else {
      this.attempts.set(ip, { count: 1, firstAttempt: now });
    }

    return true;
  }
}
