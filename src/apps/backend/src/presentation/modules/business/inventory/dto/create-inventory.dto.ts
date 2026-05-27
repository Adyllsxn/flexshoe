import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsNumber,
  Min,
  IsUUID,
} from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({ example: 'uuid-do-produto' })
  @IsNotEmpty()
  @IsUUID()
  productId!: string;

  @ApiProperty({ example: 39 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  size!: number;

  @ApiProperty({ example: 'Branco' })
  @IsNotEmpty()
  @IsString()
  color!: string;

  @ApiProperty({ example: 'NIKE-AIRMAX90-39-BRANCO' })
  @IsNotEmpty()
  @IsString()
  sku!: string;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @ApiProperty({ example: 599.9 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  active?: boolean;
}
