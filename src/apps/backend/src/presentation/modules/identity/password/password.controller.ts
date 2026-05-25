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

// TODO: Adicionar Guards depois
// import { JwtAuthGuard } from 'src/presentation/common/guards/jwt-auth.guard';
// import { RolesGuard } from 'src/presentation/common/guards/roles.guard';
// import { AdminOrEmployee } from 'src/presentation/common/decorators/admin-or-employee.decorator';
// import { CurrentUser } from 'src/presentation/common/decorators/current-user.decorator';
// import type { AuthenticatedUser } from 'src/core/types/authenticated-user.type';

@ApiTags('password')
@ApiBearerAuth()
@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('change')
  // @AdminOrEmployee() // TODO: Descomentar depois
  // @UseGuards(JwtAuthGuard, RolesGuard) // TODO: Descomentar depois
  @ApiOperation({ summary: 'Alterar senha do utilizador autenticado' })
  @ApiResponse({ status: 200, description: 'Senha alterada com sucesso' })
  @ApiResponse({ status: 401, description: 'Senha atual inválida' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    // @CurrentUser() user: AuthenticatedUser, // TODO: Descomentar depois
  ) {
    // TODO: Pegar userId do usuário logado depois
    const userId = 'temp-user-id'; // Temporário
    return this.passwordService.changePassword(changePasswordDto, userId);
  }

  @Post('forgot')
  @ApiOperation({ summary: 'Esqueci a senha - gera senha temporária' })
  @ApiResponse({ status: 200, description: 'Senha temporária enviada' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.passwordService.forgotPassword(forgotPasswordDto);
  }
}