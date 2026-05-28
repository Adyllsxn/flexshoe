import { IOrder, IOrderWithItems, OrderStatus } from '../types/order.type';
import { CreateOrderDto } from 'src/presentation/modules/business/order/dto/create-order.dto';
import { UpdateOrderDto } from 'src/presentation/modules/business/order/dto/update-order.dto';
import { PaginationDto } from 'src/domain/shared/pagination/pagination.dto';

export interface IOrderService {
  create(createOrderDto: CreateOrderDto): Promise<IOrderWithItems>;
  findAll(paginationDto: PaginationDto): Promise<{
    data: IOrderWithItems[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  findOne(id: string): Promise<IOrderWithItems>;
  update(id: string, updateOrderDto: UpdateOrderDto): Promise<IOrder>;
  updateStatus(
    id: string,
    status: OrderStatus,
    userId: string,
  ): Promise<IOrder>;
  remove(id: string): Promise<{ message: string }>;
  getByPhone(
    phone: string,
    paginationDto: PaginationDto,
  ): Promise<{
    data: IOrderWithItems[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
}