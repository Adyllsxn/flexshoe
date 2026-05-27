import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsUUID,
  Min,
} from 'class-validator';

export enum Gender {
  male = 'male',
  female = 'female',
  unisex = 'unisex',
  kids = 'kids',
}

export class CreateProductDto {
  @ApiProperty({ example: 'Air Max 90' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'air-max-90' })
  @IsNotEmpty()
  @IsString()
  slug!: string;

  @ApiProperty({ example: 'Clássico tênis da Nike', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 599.9 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: 'uuid-da-marca' })
  @IsNotEmpty()
  @IsUUID()
  brandId!: string;

  @ApiProperty({ enum: Gender, example: 'unisex' })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender!: Gender;

  @ApiProperty({ example: 'https://...', required: false })
  @IsOptional()
  @IsString()
  mainImage?: string;

  @ApiProperty({ example: [], required: false })
  @IsOptional()
  images?: string[];

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}
