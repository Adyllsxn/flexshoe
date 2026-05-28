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
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { SearchAccountDto } from './dto/search-account.dto';
import { PaginationDto } from 'src/domain/shared/pagination/pagination.dto';
import { AdminOrEmployee } from 'src/presentation/common/decorators/admin-or-employee.decorator';
import { AdminOnly } from 'src/presentation/common/decorators/admin-only.decorator';
import { JwtAuthGuard } from 'src/presentation/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/presentation/common/guards/roles.guard';
import { CurrentUser } from 'src/presentation/common/decorators/current-user.decorator';

@ApiTags('account')
@ApiBearerAuth()
@Controller('account')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @AdminOnly()
  @ApiOperation({ summary: 'Criar novo utilizador (admin)' })
  @ApiResponse({ status: 201, description: 'Utilizador criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Email já existe' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  @AdminOnly()
  @ApiOperation({ summary: 'Listar todos os utilizadores (admin)' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.accountService.findAll(paginationDto);
  }

  @Get('search')
  @AdminOnly()
  @ApiOperation({ summary: 'Buscar utilizador por nome' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findByName(@Query() searchDto: SearchAccountDto) {
    if (!searchDto.name) {
      return this.accountService.findAll(searchDto);
    }
    return this.accountService.findByName(searchDto.name, searchDto);
  }

  @Get('me')
  @AdminOrEmployee()
  @ApiOperation({ summary: 'Dados do próprio utilizador logado' })
  @ApiResponse({ status: 200, description: 'Dados retornados com sucesso' })
  findMe(@CurrentUser() user: { id: string; role: string }) {
    if (!user) {
      throw new ForbiddenException('Usuário não encontrado');
    }
    return this.accountService.findMe(user.id);
  }

  @Get(':id')
  @AdminOnly()
  @ApiOperation({ summary: 'Buscar utilizador por ID (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do utilizador' })
  @ApiResponse({ status: 200, description: 'Utilizador encontrado' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Patch(':id')
  @AdminOrEmployee()
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
    @CurrentUser() user: { id: string; role: string },
  ) {
    if (!user) {
      throw new ForbiddenException('Usuário não encontrado');
    }

    if (user.role !== 'admin' && user.id !== id) {
      throw new ForbiddenException(
        'Não tem permissão para editar este utilizador',
      );
    }

    return this.accountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @AdminOnly()
  @ApiOperation({ summary: 'Soft delete utilizador (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do utilizador' })
  @ApiResponse({ status: 200, description: 'Utilizador deletado' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  @ApiResponse({ status: 400, description: 'Utilizador já está deletado' })
  remove(@Param('id') id: string) {
    return this.accountService.remove(id);
  }

  @Patch(':id/restore')
  @AdminOnly()
  @ApiOperation({ summary: 'Restaurar utilizador deletado (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do utilizador' })
  @ApiResponse({ status: 200, description: 'Utilizador restaurado' })
  @ApiResponse({ status: 404, description: 'Utilizador não encontrado' })
  @ApiResponse({ status: 400, description: 'Utilizador não está deletado' })
  restore(@Param('id') id: string) {
    return this.accountService.restore(id);
  }
}
