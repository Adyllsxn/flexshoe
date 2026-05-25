import {
  ILoginResponse,
  ICheckAuthResponse,
  ILogoutResponse,
} from '../types/auth.type';
import { LoginAuthDto } from 'src/presentation/modules/identity/auth/dto/login-auth.dto';

export interface IAuthService {
  login(loginDto: LoginAuthDto, ipAddress?: string): Promise<ILoginResponse>;
  logout(): ILogoutResponse;
  checkAuth(userId: string | null): Promise<ICheckAuthResponse>;
  validateUser(
    id: string,
  ): Promise<{ id: string; email: string; name: string; role: string } | null>;
}
