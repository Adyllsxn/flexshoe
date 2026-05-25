import { IUserRole, IRoleListResponse } from '../types/permission.type';
import { UpdateRoleDto } from 'src/presentation/modules/identity/permission/dto/update-role.dto';

export interface IPermissionService {
  listRoles(): IRoleListResponse;
  getUserRole(id: string): Promise<IUserRole>;
  updateUserRole(
    updateRoleDto: UpdateRoleDto,
  ): Promise<{ message: string; user: IUserRole }>;
}