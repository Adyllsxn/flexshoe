import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/domain/shared/pagination/pagination.dto';

export class SearchAccountDto extends PaginationDto {
  @ApiPropertyOptional({ example: 'João' })
  @IsOptional()
  @IsString()
  name?: string;
}
