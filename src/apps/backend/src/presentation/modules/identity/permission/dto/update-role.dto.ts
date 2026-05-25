import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum } from 'class-validator';

export type UserRole = 'admin' | 'employee';

export class UpdateRoleDto {
  @ApiProperty({
    description: 'ID do utilizador',
    example: '42f4ab74-95e4-4748-b409-6b8610a8d182',
  })
  @IsUUID()
  userId!: string;

  @ApiProperty({
    description: 'Nova role do utilizador',
    enum: ['admin', 'employee'],
    example: 'admin',
  })
  @IsEnum(['admin', 'employee'])
  role!: UserRole;
}