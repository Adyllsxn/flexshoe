import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PaginationDto } from 'src/domain/shared/pagination/pagination.dto';

// TODO: Adicionar Guards depois
// import { JwtAuthGuard } from 'src/presentation/common/guards/jwt-auth.guard';
// import { RolesGuard } from 'src/presentation/common/guards/roles.guard';
// import { AdminOnly } from 'src/presentation/common/decorators/admin-only.decorator';
// import { AdminOrEmployee } from 'src/presentation/common/decorators/admin-or-employee.decorator';
// import { CurrentUser } from 'src/presentation/common/decorators/current-user.decorator';
// import type { AuthenticatedUser } from 'src/core/types/authenticated-user.type';

@ApiTags('account')
@ApiBearerAuth()
@Controller('account')
// @UseGuards(JwtAuthGuard, RolesGuard) // TODO: Descomentar depois
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  // @AdminOnly() // TODO: Descomentar depois
  @ApiOperation({ summary: 'Criar novo utilizador (admin)' })
  @ApiResponse({ status: 201, description: 'Utilizador criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Email já existe' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  // @AdminOnly() // TODO: Descomentar depois
  @ApiOperation({ summary: 'Listar todos os utilizadores (admin)' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.accountService.findAll(paginationDto);
  }

  @Get('search')
  // @AdminOnly() // TODO: Descomentar depois
  @ApiOperation({ summary: 'Buscar utilizador por nome' })
  @ApiQuery({ name: 'name', required: true, example: 'João' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findByName(
    @Query('name') name: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.accountService.findByName(name, paginationDto);
  }

  @Get('me')
  // @AdminOrEmployee() // TODO: Descomentar depois
  @ApiOperation({ summary: 'Dados do próprio utilizador logado' })
  @ApiResponse({ status: 200, description: 'Dados retornados com sucesso' })
  findMe(@Query('userId') userId: string) {
    // TODO: Pegar do CurrentUser depois
    return this.accountService.findMe(userId);
  }

  @Get(':id')
  // @AdminOnly() // TODO: Descomentar depois
  @ApiOperation({ summary: 'Buscar utilizador por ID (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do utilizador' })
  @ApiResponse({ status: 200, description: 'Utilizador encontrado' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Patch(':id')
  // @AdminOrEmployee() // TODO: Descomentar depois
  @ApiOperation({ summary: 'Atualizar utilizador' })
  @ApiParam({ name: 'id', description: 'UUID do utilizador' })
  @ApiResponse({ status: 200, description: 'Utilizador atualizado' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  @ApiResponse({ status: 409, description: 'Email já existe' })
  @ApiResponse({
    status: 403,
    description: 'Não tem permissão para editar este utilizador',
  })
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
    // @CurrentUser() user: AuthenticatedUser, // TODO: Descomentar depois
  ) {
    // TODO: Implementar lógica de permissão depois
    // if (user.role !== UserRole.admin && user.id !== id) {
    //   throw new ForbiddenException('Não tem permissão para editar este utilizador');
    // }
    
    // if (user.role !== UserRole.admin) {
    //   delete (updateAccountDto as any).role;
    // }
    
    return this.accountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  // @AdminOnly() // TODO: Descomentar depois
  @ApiOperation({ summary: 'Soft delete utilizador (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do utilizador' })
  @ApiResponse({ status: 200, description: 'Utilizador deletado' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  @ApiResponse({ status: 400, description: 'Utilizador já está deletado' })
  remove(@Param('id') id: string) {
    return this.accountService.remove(id);
  }

  @Patch(':id/restore')
  // @AdminOnly() // TODO: Descomentar depois
  @ApiOperation({ summary: 'Restaurar utilizador deletado (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do utilizador' })
  @ApiResponse({ status: 200, description: 'Utilizador restaurado' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  @ApiResponse({ status: 400, description: 'Utilizador não está deletado' })
  restore(@Param('id') id: string) {
    return this.accountService.restore(id);
  }
}