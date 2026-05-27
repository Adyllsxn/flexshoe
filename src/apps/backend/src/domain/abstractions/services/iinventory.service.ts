import {
  IInventoryItem,
  IInventoryItemWithProduct,
} from '../types/inventory.type';
import { CreateInventoryDto } from 'src/presentation/modules/business/inventory/dto/create-inventory.dto';
import { UpdateInventoryDto } from 'src/presentation/modules/business/inventory/dto/update-inventory.dto';
import { PaginationDto } from 'src/domain/shared/pagination/pagination.dto';

export interface IInventoryService {
  findAll(paginationDto: PaginationDto): Promise<{
    data: IInventoryItemWithProduct[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  findByProduct(productId: string): Promise<IInventoryItem[]>;
  findOne(id: string): Promise<IInventoryItemWithProduct>;
  create(createInventoryDto: CreateInventoryDto): Promise<IInventoryItem>;
  update(
    id: string,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<IInventoryItem>;
  remove(id: string): Promise<{ message: string; item: IInventoryItem }>;
  updateStock(id: string, quantity: number): Promise<IInventoryItem>;
  reserveStock(id: string, quantity: number): Promise<IInventoryItem>;
  releaseStock(id: string, quantity: number): Promise<IInventoryItem>;
}
