import { IStore } from '../types/store.type';
import { UpdateStoreDto } from 'src/presentation/modules/business/store/dto/update-store.dto';

export interface IStoreService {
  findOne(): Promise<IStore>;
  update(updateStoreDto: UpdateStoreDto): Promise<IStore>;
}