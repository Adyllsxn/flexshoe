import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { PaginationDto } from 'src/domain/shared/pagination/pagination.dto';
import { JwtAuthGuard } from 'src/presentation/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/presentation/common/guards/roles.guard';
import { AdminOnly } from 'src/presentation/common/decorators/admin-only.decorator';
import { CurrentUser } from 'src/presentation/common/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/domain/abstractions/types/auth.type';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos (com paginação)' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar produtos por nome' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findByName(@Query() searchDto: SearchProductDto) {
    if (!searchDto.name) {
      return this.productService.findAll(searchDto);
    }
    return this.productService.findByName(searchDto.name, searchDto);
  }

  @Get('brand/:brandId')
  @ApiOperation({ summary: 'Buscar produtos por marca' })
  @ApiParam({ name: 'brandId', description: 'UUID da marca' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findByBrand(
    @Param('brandId') brandId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.productService.findByBrand(brandId, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiResponse({ status: 200, description: 'Produto encontrado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar novo produto (admin)' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Produto com este slug já existe' })
  @ApiResponse({ status: 404, description: 'Marca não encontrada' })
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.productService.create(createProductDto, user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar produto (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiResponse({ status: 200, description: 'Produto atualizado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 409, description: 'Conflito de slug' })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.productService.update(id, updateProductDto, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete - esconder produto (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiResponse({ status: 200, description: 'Produto deletado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 400, description: 'Produto já está deletado' })
  remove(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.productService.remove(id, user.id);
  }

  @Patch(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Restaurar produto deletado (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiResponse({ status: 200, description: 'Produto restaurado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 400, description: 'Produto não está deletado' })
  restore(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.productService.restore(id, user.id);
  }

  @Patch(':id/stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar estoque do produto (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiQuery({ name: 'quantity', required: true, example: 10 })
  @ApiResponse({ status: 200, description: 'Estoque atualizado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  updateStock(
    @Param('id') id: string,
    @Query('quantity') quantity: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const quantityNum = parseInt(quantity, 10);
    return this.productService.updateStock(id, quantityNum, user.id);
  }
}