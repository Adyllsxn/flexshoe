import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateStoreDto {
  @ApiPropertyOptional({ example: 'FlexShoe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '244900000000' })
  @IsOptional()
  @IsString()
  whatsapp?: string;

  @ApiPropertyOptional({ example: 'contato@flexshoe.ao' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'Luanda, Angola' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '#E05A2A' })
  @IsOptional()
  @IsString()
  primaryColor?: string;
}
