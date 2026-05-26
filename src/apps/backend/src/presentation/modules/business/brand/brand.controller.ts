import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { JwtAuthGuard } from 'src/presentation/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/presentation/common/guards/roles.guard';
import { AdminOnly } from 'src/presentation/common/decorators/admin-only.decorator';
import { CurrentUser } from 'src/presentation/common/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/domain/abstractions/types/auth.type';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as marcas' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findAll() {
    return this.brandService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar marca por ID' })
  @ApiParam({ name: 'id', description: 'UUID da marca' })
  @ApiResponse({ status: 200, description: 'Marca encontrada' })
  @ApiResponse({ status: 404, description: 'Marca não encontrada' })
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar nova marca (admin)' })
  @ApiResponse({ status: 201, description: 'Marca criada com sucesso' })
  @ApiResponse({ status: 409, description: 'Marca já existe' })
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createBrandDto: CreateBrandDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.brandService.create(createBrandDto, user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar marca (admin)' })
  @ApiParam({ name: 'id', description: 'UUID da marca' })
  @ApiResponse({ status: 200, description: 'Marca atualizada' })
  @ApiResponse({ status: 404, description: 'Marca não encontrada' })
  @ApiResponse({ status: 409, description: 'Conflito de nome/slug' })
  update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.brandService.update(id, updateBrandDto, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar marca (admin)' })
  @ApiParam({ name: 'id', description: 'UUID da marca' })
  @ApiResponse({ status: 200, description: 'Marca deletada' })
  @ApiResponse({ status: 404, description: 'Marca não encontrada' })
  remove(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.brandService.remove(id, user.id);
  }
}