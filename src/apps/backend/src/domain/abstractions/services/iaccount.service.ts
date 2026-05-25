import { IAccount } from '../types/account.type';
import { PaginationDto } from '../../shared/pagination/pagination.dto';
import { CreateAccountDto } from 'src/presentation/modules/identity/account/dto/create-account.dto';
import { UpdateAccountDto } from 'src/presentation/modules/identity/account/dto/update-account.dto';

export interface IAccountService {
  findAll(paginationDto: PaginationDto): Promise<{
    data: IAccount[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;

  findOne(id: string): Promise<IAccount>;

  findByName(name: string, paginationDto: PaginationDto): Promise<{
    data: IAccount[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }>;

  findMe(userId: string): Promise<IAccount>;

  create(createAccountDto: CreateAccountDto): Promise<IAccount>;

  update(id: string, updateAccountDto: UpdateAccountDto): Promise<IAccount>;

  remove(id: string): Promise<{ message: string; account: IAccount }>;

  restore(id: string): Promise<{ message: string; account: IAccount }>;
}