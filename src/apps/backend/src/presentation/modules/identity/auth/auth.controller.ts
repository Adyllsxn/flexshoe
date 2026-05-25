import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCookieAuth,
} from '@nestjs/swagger';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login do utilizador' })
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(
    @Body() loginDto: LoginAuthDto,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const ipAddress = request.ip || request.socket?.remoteAddress;
    const loginResponse = await this.authService.login(loginDto, ipAddress);

    response.cookie('jwt', loginResponse.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: loginResponse.tokenExpires,
    });

    return {
      message: 'Login realizado com sucesso ✅',
      data: {
        id: loginResponse.id,
        email: loginResponse.email,
        name: loginResponse.name,
        role: loginResponse.role,
        tokenExpires: loginResponse.tokenExpires,
      },
    };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout do utilizador' })
  @ApiCookieAuth('jwt')
  @ApiResponse({ status: 200, description: 'Logout realizado com sucesso' })
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return this.authService.logout();
  }

  @Get('check')
  @ApiOperation({ summary: 'Verificar autenticação' })
  @ApiResponse({ status: 200, description: 'Retorna status da autenticação' })
  checkAuth(@Req() request: Request) {
    const cookies = request.cookies as Record<string, string | undefined>;
    const token = cookies?.jwt;

    if (!token || typeof token !== 'string') {
      return { authenticated: false, user: null };
    }

    return {
      authenticated: true,
      user: null,
    };
  }
}