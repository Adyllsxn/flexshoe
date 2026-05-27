import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'João Silva' })
  @IsNotEmpty()
  @IsString()
  clientName!: string;

  @ApiProperty({ example: '244999999999' })
  @IsNotEmpty()
  @IsPhoneNumber()
  clientPhone!: string;

  @ApiProperty({ example: 'Luanda, Angola', required: false })
  @IsOptional()
  @IsString()
  clientAddress?: string;

  @ApiProperty({ example: 'cart_session_id_from_cookie' })
  @IsNotEmpty()
  @IsString()
  cartSessionId!: string;
}