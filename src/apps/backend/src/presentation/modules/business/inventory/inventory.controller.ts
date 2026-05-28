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
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { PaginationDto } from 'src/domain/shared/pagination/pagination.dto';
import { JwtAuthGuard } from 'src/presentation/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/presentation/common/guards/roles.guard';
import { AdminOnly } from 'src/presentation/common/decorators/admin-only.decorator';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os itens de inventário' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.inventoryService.findAll(paginationDto);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Buscar itens por produto' })
  @ApiParam({ name: 'productId', description: 'UUID do produto' })
  @ApiResponse({ status: 200, description: 'Itens encontrados' })
  findByProduct(@Param('productId') productId: string) {
    return this.inventoryService.findByProduct(productId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar item de inventário por ID' })
  @ApiParam({ name: 'id', description: 'UUID do item' })
  @ApiResponse({ status: 200, description: 'Item encontrado' })
  @ApiResponse({ status: 404, description: 'Item não encontrado' })
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar item de inventário (admin)' })
  @ApiResponse({ status: 201, description: 'Item criado com sucesso' })
  @ApiResponse({ status: 409, description: 'SKU ou combinação já existe' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar item de inventário (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do item' })
  @ApiResponse({ status: 200, description: 'Item atualizado' })
  @ApiResponse({ status: 404, description: 'Item não encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Desativar item de inventário (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do item' })
  @ApiResponse({ status: 200, description: 'Item desativado' })
  @ApiResponse({ status: 404, description: 'Item não encontrado' })
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(id);
  }

  @Patch(':id/restore')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reativar item de inventário (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do item' })
  @ApiResponse({ status: 200, description: 'Item reativado' })
  @ApiResponse({ status: 404, description: 'Item não encontrado' })
  @ApiResponse({ status: 400, description: 'Item já está ativo' })
  restore(@Param('id') id: string) {
    return this.inventoryService.restore(id);
  }

  @Patch(':id/stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar estoque (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do item' })
  @ApiQuery({ name: 'quantity', required: true, example: 10 })
  @ApiResponse({ status: 200, description: 'Estoque atualizado' })
  updateStock(@Param('id') id: string, @Query('quantity') quantity: string) {
    const quantityNum = parseInt(quantity, 10);
    return this.inventoryService.updateStock(id, quantityNum);
  }

  @Post(':id/reserve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Reservar estoque (para carrinho)' })
  @ApiParam({ name: 'id', description: 'UUID do item' })
  @ApiQuery({ name: 'quantity', required: true, example: 2 })
  @ApiResponse({ status: 200, description: 'Estoque reservado' })
  reserveStock(@Param('id') id: string, @Query('quantity') quantity: string) {
    const quantityNum = parseInt(quantity, 10);
    return this.inventoryService.reserveStock(id, quantityNum);
  }

  @Post(':id/release')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Liberar reserva de estoque' })
  @ApiParam({ name: 'id', description: 'UUID do item' })
  @ApiQuery({ name: 'quantity', required: true, example: 2 })
  @ApiResponse({ status: 200, description: 'Reserva liberada' })
  releaseStock(@Param('id') id: string, @Query('quantity') quantity: string) {
    const quantityNum = parseInt(quantity, 10);
    return this.inventoryService.releaseStock(id, quantityNum);
  }
}
