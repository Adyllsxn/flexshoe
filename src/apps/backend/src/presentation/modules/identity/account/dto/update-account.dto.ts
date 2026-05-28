import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateAccountDto {
  @ApiPropertyOptional({ example: 'João Silva Atualizado' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'novoemail@flexshoe.ao' })
  @IsOptional()
  @IsEmail()
  email?: string;
}
