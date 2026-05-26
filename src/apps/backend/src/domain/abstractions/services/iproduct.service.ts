import { IProduct, IProductWithBrand } from '../types/product.type';
import { CreateProductDto } from 'src/presentation/modules/business/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/presentation/modules/business/product/dto/update-product.dto';
import { PaginationDto } from 'src/domain/shared/pagination/pagination.dto';

export interface IProductService {
  findAll(paginationDto: PaginationDto): Promise<{
    data: IProductWithBrand[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  findOne(id: string): Promise<IProductWithBrand>;
  findByName(name: string, paginationDto: PaginationDto): Promise<{
    data: IProductWithBrand[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  findByBrand(brandId: string, paginationDto: PaginationDto): Promise<{
    data: IProductWithBrand[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;
  create(createProductDto: CreateProductDto, userId: string): Promise<IProduct>;
  update(id: string, updateProductDto: UpdateProductDto, userId: string): Promise<IProduct>;
  remove(id: string, userId: string): Promise<{ message: string; product: IProduct }>;
  restore(id: string, userId: string): Promise<{ message: string; product: IProduct }>;
  updateStock(id: string, quantity: number, userId: string): Promise<IProduct>;
  incrementViews(id: string): Promise<void>;
}