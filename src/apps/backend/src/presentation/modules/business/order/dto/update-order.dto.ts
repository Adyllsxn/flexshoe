import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';

export enum OrderStatus {
  pending = 'pending',
  approved = 'approved',
  delivered = 'delivered',
  cancelled = 'cancelled',
}

export class UpdateOrderDto {
  @ApiPropertyOptional({ enum: OrderStatus, example: 'approved' })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiPropertyOptional({ example: 'João Silva Atualizado' })
  @IsOptional()
  @IsString()
  clientName?: string;

  @ApiPropertyOptional({ example: '244999999999' })
  @IsOptional()
  @IsString()
  clientPhone?: string;

  @ApiPropertyOptional({ example: 'Nova Moradia, Luanda' })
  @IsOptional()
  @IsString()
  clientAddress?: string;
}
