import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  @ApiPropertyOptional({ example: 'João Silva Atualizado' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'novoemail@flexshoe.ao' })
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'novasenha123' })
  @IsOptional()
  password?: string;
}
