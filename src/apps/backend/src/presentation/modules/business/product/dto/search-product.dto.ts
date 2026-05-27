import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/domain/shared/pagination/pagination.dto';

export class SearchProductDto extends PaginationDto {
  @ApiPropertyOptional({ example: 'Air Max' })
  @IsOptional()
  @IsString()
  name?: string;
}
