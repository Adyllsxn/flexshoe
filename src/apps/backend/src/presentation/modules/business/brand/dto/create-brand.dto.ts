import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ 
    example: 'Nike',
    description: 'Nome da marca (ex: Nike, Adidas, Puma)'
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ 
    example: 'nike',
    description: 'Slug da marca (identificador único para URL)'
  })
  @IsNotEmpty()
  @IsString()
  slug!: string;

  @ApiProperty({ 
    example: true, 
    required: false,
    description: 'Status da marca (true = ativo, false = inativo)'
  })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}