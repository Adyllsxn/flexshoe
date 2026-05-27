import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto, OrderStatus } from './dto/update-order.dto';
import { PaginationDto } from 'src/domain/shared/pagination/pagination.dto';
import { JwtAuthGuard } from 'src/presentation/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/presentation/common/guards/roles.guard';
import { AdminOnly } from 'src/presentation/common/decorators/admin-only.decorator';
import { AdminOrEmployee } from 'src/presentation/common/decorators/admin-or-employee.decorator';
import { CurrentUser } from 'src/presentation/common/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/domain/abstractions/types/auth.type';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo pedido (público - cliente finaliza compra)',
  })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Carrinho vazio' })
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOrEmployee()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os pedidos (admin/employee)' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.orderService.findAll(paginationDto);
  }

  @Get('phone/:phone')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOrEmployee()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar pedidos por telefone (admin/employee)' })
  @ApiParam({ name: 'phone', description: 'Número de telefone' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  getByPhone(
    @Param('phone') phone: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.orderService.getByPhone(phone, paginationDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOrEmployee()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar pedido por ID (admin/employee)' })
  @ApiParam({ name: 'id', description: 'UUID do pedido' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOrEmployee()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar pedido (admin/employee)' })
  @ApiParam({ name: 'id', description: 'UUID do pedido' })
  @ApiResponse({ status: 200, description: 'Pedido atualizado' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar status do pedido (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do pedido' })
  @ApiQuery({ name: 'status', enum: OrderStatus, example: 'approved' })
  @ApiResponse({ status: 200, description: 'Status atualizado' })
  updateStatus(
    @Param('id') id: string,
    @Query('status') status: OrderStatus,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.orderService.updateStatus(id, status, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar pedido (admin)' })
  @ApiParam({ name: 'id', description: 'UUID do pedido' })
  @ApiResponse({ status: 200, description: 'Pedido deletado' })
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
