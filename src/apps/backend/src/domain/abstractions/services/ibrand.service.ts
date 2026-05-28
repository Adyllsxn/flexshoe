import { IBrand } from '../types/brand.type';
import { CreateBrandDto } from 'src/presentation/modules/business/brand/dto/create-brand.dto';
import { UpdateBrandDto } from 'src/presentation/modules/business/brand/dto/update-brand.dto';

export interface IBrandService {
  findAll(): Promise<IBrand[]>;
  findOne(id: string): Promise<IBrand>;
  create(createBrandDto: CreateBrandDto, userId: string): Promise<IBrand>;
  update(
    id: string,
    updateBrandDto: UpdateBrandDto,
    userId: string,
  ): Promise<IBrand>;
  remove(id: string, userId: string): Promise<IBrand>;
  restore(id: string, userId: string): Promise<IBrand>;
}
