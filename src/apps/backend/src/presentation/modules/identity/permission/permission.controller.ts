import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { UpdateRoleDto } from './dto/update-role.dto';

// TODO: Adicionar Guards depois
// import { JwtAuthGuard } from 'src/presentation/common/guards/jwt-auth.guard';
// import { RolesGuard } from 'src/presentation/common/guards/roles.guard';
// import { AdminOnly } from 'src/presentation/common/decorators/admin-only.decorator';

@ApiTags('permission')
@ApiBearerAuth()
@Controller('permission')
// @UseGuards(JwtAuthGuard, RolesGuard) // TODO: Descomentar depois
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('roles')
  // @AdminOnly() // TODO: Descomentar depois
  @ApiOperation({ summary: 'Listar todas as roles disponíveis' })
  @ApiResponse({
    status: 200,
    description: 'Lista de roles retornada com sucesso',
  })
  listRoles() {
    return this.permissionService.listRoles();
  }

  @Get('users/:id')
  // @AdminOnly() // TODO: Descomentar depois
  @ApiOperation({ summary: 'Buscar role de um utilizador específico' })
  @ApiParam({ name: 'id', description: 'UUID do utilizador' })
  @ApiResponse({ status: 200, description: 'Role encontrada' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  async getUserRole(@Param('id') id: string) {
    return this.permissionService.getUserRole(id);
  }

  @Patch('users/role')
  // @AdminOnly() // TODO: Descomentar depois
  @ApiOperation({ summary: 'Alterar role de um utilizador' })
  @ApiResponse({ status: 200, description: 'Role alterada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  async updateUserRole(@Body() updateRoleDto: UpdateRoleDto) {
    return this.permissionService.updateUserRole(updateRoleDto);
  }
}