import {
  Controller,
  Get,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { StoreService } from './store.service';
import { UpdateStoreDto } from './dto/update-store.dto';
import { JwtAuthGuard } from 'src/presentation/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/presentation/common/guards/roles.guard';
import { AdminOnly } from 'src/presentation/common/decorators/admin-only.decorator';

@ApiTags('store')
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  @ApiOperation({ summary: 'Buscar configurações da loja' })
  @ApiResponse({ status: 200, description: 'Configurações encontradas' })
  @ApiResponse({ status: 404, description: 'Configurações não encontradas' })
  findOne() {
    return this.storeService.findOne();
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar configurações da loja (admin)' })
  @ApiResponse({ status: 200, description: 'Configurações atualizadas' })
  @ApiResponse({ status: 404, description: 'Configurações não encontradas' })
  @HttpCode(HttpStatus.OK)
  update(@Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(updateStoreDto);
  }
}
