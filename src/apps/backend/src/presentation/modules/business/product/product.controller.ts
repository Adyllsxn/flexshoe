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
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
  @ApiOperation({ summary: 'Criar novo produto (admin) com imagem' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        name: { type: 'string' },
        slug: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        brandId: { type: 'string' },
        gender: { type: 'string', enum: ['male', 'female', 'unisex', 'kids'] },
        active: { type: 'boolean' },
        featured: { type: 'boolean' },
        stock: { type: 'number' },
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    let mainImage: string | undefined;

    if (file) {
      mainImage = await this.uploadService.saveImage(file, 'products');
    }

    return this.productService.create(
      { ...createProductDto, mainImage },
      user.id,
    );
  }

  @Post('with-images')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar produto com múltiplas imagens' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files', 10))
  async createWithImages(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser() user: AuthenticatedUser,
  ) {
    let mainImage: string | undefined;
    const images: string[] = [];

    if (files && files.length > 0) {
      // Primeira imagem como principal
      mainImage = await this.uploadService.saveImage(files[0], 'products');

      // Demais imagens
      for (let i = 1; i < files.length; i++) {
        const imageUrl = await this.uploadService.saveImage(
          files[i],
          'products',
        );
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
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.productService.update(id, updateProductDto, user.id);
  }

  @Patch(':id/image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar imagem do produto' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    const product = await this.productService.findOne(id);

    // Deletar imagem antiga
    if (product.mainImage) {
      this.uploadService.deleteImage(product.mainImage);
    }

    const mainImage = await this.uploadService.saveImage(file, 'products');

    return this.productService.update(id, { mainImage }, user.id);
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
