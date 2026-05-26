import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs/promises';
import * as path from 'path';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IPasswordService } from 'src/domain/abstractions/services/ipassword.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Injectable()
export class PasswordService implements IPasswordService {
  constructor(private readonly prismaService: PrismaService) {}

  async changePassword(
    changePasswordDto: ChangePasswordDto,
    userId: string,
  ): Promise<{ message: string }> {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId, deletedAt: null },
    });

    if (!user) {
      throw new NotFoundException('Utilizador não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha atual inválida');
    }

    if (
      changePasswordDto.newPassword !== changePasswordDto.confirmNewPassword
    ) {
      throw new BadRequestException('As senhas não coincidem');
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);

    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    return { message: 'Senha alterada com sucesso ✅' };
  }

  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<{ message: string }> {
    const user = await this.prismaService.user.findFirst({
      where: { email: forgotPasswordDto.email, deletedAt: null },
    });

    if (!user) {
      return {
        message: 'Se o email existir, uma senha temporária foi enviada',
      };
    }

    const tempPassword = this.generateTemporaryPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });

    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment) {
      await this.savePasswordToFile(user.email, tempPassword);
    } else {
      await this.sendEmail(user.email, tempPassword);
    }

    return {
      message: 'Se o email existir, uma senha temporária foi enviada',
    };
  }

  private generateTemporaryPassword(): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  private async savePasswordToFile(email: string, tempPassword: string) {
    const dir = path.join(process.cwd(), 'temp-passwords');
    try {
      await fs.mkdir(dir, { recursive: true });
      const fileName = `passwords_${new Date().toISOString().split('T')[0]}.txt`;
      const filePath = path.join(dir, fileName);
      const content = `[${new Date().toISOString()}] Email: ${email} | Senha Temporária: ${tempPassword}\n`;
      await fs.appendFile(filePath, content);
      console.log(`🔐 Senha temporária salva em: ${filePath}`);
      console.log(`📧 Email: ${email} | Senha: ${tempPassword}`);
    } catch (error) {
      console.error('Erro ao salvar senha temporária:', error);
    }
  }

  private async sendEmail(email: string, tempPassword: string): Promise<void> {
    // TODO: Integrar com serviço de email real (ex: SendGrid, AWS SES, etc)
    return new Promise((resolve) => {
      console.log(`📧 Enviando email para ${email} com senha: ${tempPassword}`);
      resolve();
    });
  }
}
