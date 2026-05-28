import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOrderDto {
  @ApiPropertyOptional({ example: 'João Silva Atualizado' })
  @IsOptional()
  @IsString()
  clientName?: string;

  @ApiPropertyOptional({ example: '+244999999999' })
  @IsOptional()
  @IsString()
  clientPhone?: string;

  @ApiPropertyOptional({ example: 'Nova Moradia, Luanda' })
  @IsOptional()
  @IsString()
  clientAddress?: string;
}