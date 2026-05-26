import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IAuthService } from 'src/domain/abstractions/services/iauth.service';
import {
  ILoginResponse,
  ICheckAuthResponse,
  ILogoutResponse,
  IJwtPayload,
} from 'src/domain/abstractions/types/auth.type';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    loginDto: LoginAuthDto,
    ipAddress?: string,
  ): Promise<ILoginResponse> {
    const { email, password } = loginDto;

    const user = await this.prismaService.user.findFirst({
      where: { email, deletedAt: null },
    });

    if (!user) {
      console.log(`🔐 Failed login: Email: ${email}, IP: ${ipAddress}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log(`🔐 Failed login: Email: ${email}, IP: ${ipAddress}`);
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const tokenExpires = new Date();
    tokenExpires.setDate(tokenExpires.getDate() + 1);

    const payload: IJwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload as object);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      token,
      tokenExpires,
    };
  }

  logout(): ILogoutResponse {
    return { message: 'Logout realizado com sucesso ✅' };
  }

  async checkAuth(userId: string | null): Promise<ICheckAuthResponse> {
    if (!userId) {
      return { authenticated: false, user: null };
    }

    const user = await this.prismaService.user.findFirst({
      where: { id: userId, deletedAt: null },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return { authenticated: false, user: null };
    }

    return {
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async validateUser(
    id: string,
  ): Promise<{ id: string; email: string; name: string; role: string } | null> {
    const user = await this.prismaService.user.findFirst({
      where: { id, deletedAt: null },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
