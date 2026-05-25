import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ description: 'Senha atual' })
  @IsString()
  @MinLength(6)
  currentPassword!: string;

  @ApiProperty({ description: 'Nova senha' })
  @IsString()
  @MinLength(6)
  newPassword!: string;

  @ApiProperty({ description: 'Confirmar nova senha' })
  @IsString()
  @MinLength(6)
  confirmNewPassword!: string;
}