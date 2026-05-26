import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PasswordService } from './password.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { AdminOrEmployee } from 'src/presentation/common/decorators/admin-or-employee.decorator';
import { JwtAuthGuard } from 'src/presentation/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/presentation/common/guards/roles.guard';
import { CurrentUser } from 'src/presentation/common/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/domain/abstractions/types/auth.type';

@ApiTags('password')
@ApiBearerAuth()
@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('change')
  @AdminOrEmployee()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Alterar senha do utilizador autenticado' })
  @ApiResponse({ status: 200, description: 'Senha alterada com sucesso' })
  @ApiResponse({ status: 401, description: 'Senha atual inválida' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.passwordService.changePassword(changePasswordDto, user.id);
  }

  @Post('forgot')
  @ApiOperation({ summary: 'Esqueci a senha - gera senha temporária' })
  @ApiResponse({ status: 200, description: 'Senha temporária enviada' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.passwordService.forgotPassword(forgotPasswordDto);
  }
}
