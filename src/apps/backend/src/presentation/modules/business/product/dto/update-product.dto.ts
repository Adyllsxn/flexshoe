import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  Min,
  IsEnum,
} from 'class-validator';
import { Gender } from './create-product.dto';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Air Max 90' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'air-max-90' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ example: 'Clássico tênis da Nike' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 599.9 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ example: '48230a52-645f-435f-bbe6-3f0af3e0f990' })
  @IsOptional()
  @IsString() // ← Removido @IsUUID()
  brandId?: string;

  @ApiPropertyOptional({ enum: Gender, example: 'unisex' })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional({ example: 'https://...' })
  @IsOptional()
  @IsString()
  mainImage?: string;

  @ApiPropertyOptional({ example: [] })
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}
