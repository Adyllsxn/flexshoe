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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
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
import { UploadService } from 'src/infrastructure/storage/upload.service';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly uploadService: UploadService,
  ) {}

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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Air Max 90' },
        slug: { type: 'string', example: 'air-max-90' },
        description: { type: 'string', example: 'Clássico tênis da Nike' },
        price: { type: 'string', example: '599.90' },
        brandId: { type: 'string', example: 'uuid-da-marca' },
        gender: { type: 'string', enum: ['male', 'female', 'unisex', 'kids'], example: 'unisex' },
        active: { type: 'string', example: 'true' },
        featured: { type: 'string', example: 'false' },
        stock: { type: 'string', example: '10' },
        mainImage: { type: 'string', format: 'binary', description: 'Imagem principal do produto' },
        images: { 
          type: 'array', 
          items: { type: 'string', format: 'binary' },
          description: 'Imagens adicionais do produto'
        },
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: { mainImage?: Express.Multer.File[]; images?: Express.Multer.File[] },
    @CurrentUser() user: AuthenticatedUser,
  ) {
    let mainImage: string | undefined;
    const images: string[] = [];

    if (files.mainImage && files.mainImage[0]) {
      mainImage = await this.uploadService.saveImage(files.mainImage[0], 'products');
    }

    if (files.images) {
      for (const file of files.images) {
        const imageUrl = await this.uploadService.saveImage(file, 'products');
        images.push(imageUrl);
      }
    }

    return this.productService.create(
      { ...createProductDto, mainImage, images },
      user.id,
    );
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
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.productService.update(id, updateProductDto, user.id);
  }

  @Patch(':id/images')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Adicionar imagens ao produto (admin)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: { 
          type: 'array', 
          items: { type: 'string', format: 'binary' },
          description: 'Novas imagens para adicionar'
        },
      },
    },
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 10 },
  ]))
  async addImages(
    @Param('id') id: string,
    @UploadedFiles() files: { images?: Express.Multer.File[] },
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const product = await this.productService.findOne(id);
    const currentImages = product.images || [];
    const newImages: string[] = [];

    if (files.images) {
      for (const file of files.images) {
        const imageUrl = await this.uploadService.saveImage(file, 'products');
        newImages.push(imageUrl);
      }
    }

    return this.productService.update(id, { images: [...currentImages, ...newImages] }, user.id);
  }

  @Delete(':id/images')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover imagem do produto (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do produto' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imageUrl: { type: 'string', description: 'URL da imagem a ser removida' },
      },
    },
  })
  async removeImage(
    @Param('id') id: string,
    @Body('imageUrl') imageUrl: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const product = await this.productService.findOne(id);
    this.uploadService.deleteImage(imageUrl);
    const images = (product.images || []).filter(img => img !== imageUrl);
    return this.productService.update(id, { images }, user.id);
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
  @ApiQuery({ name: 'quantity', required: true, example: '10' })
  @ApiResponse({ status: 200, description: 'Estoque atualizado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async updateStock(
    @Param('id') id: string,
    @Query('quantity') quantity: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const quantityNum = parseInt(quantity, 10);
    return this.productService.updateStock(id, quantityNum, user.id);
  }
}