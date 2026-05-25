import { ChangePasswordDto } from 'src/presentation/modules/identity/password/dto/change-password.dto';
import { ForgotPasswordDto } from 'src/presentation/modules/identity/password/dto/forgot-password.dto';
import {
  IChangePasswordResponse,
  IForgotPasswordResponse,
} from '../types/password.type';

export interface IPasswordService {
  changePassword(
    changePasswordDto: ChangePasswordDto,
    userId: string,
  ): Promise<IChangePasswordResponse>;
  forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<IForgotPasswordResponse>;
}