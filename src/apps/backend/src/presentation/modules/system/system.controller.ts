import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SystemService } from './system.service';

@ApiTags('system')
@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  getHello(): string {
    return this.systemService.getHello();
  }

  @Get('info')
  @ApiOperation({
    summary: 'Informações do Sistema',
    description: 'Retorna informações sobre a API, servidor e uso de memória',
  })
  @ApiResponse({ status: 200, description: 'Informações obtidas com sucesso' })
  getSystemInfo() {
    return this.systemService.getSystemInfo();
  }

  @Get('health')
  @ApiOperation({
    summary: 'Health Check',
    description: 'Verifica o status da API e conexão com o banco de dados',
  })
  @ApiResponse({ status: 200, description: 'Sistema saudável' })
  @ApiResponse({ status: 503, description: 'Sistema não saudável' })
  async getHealth() {
    return this.systemService.getHealth();
  }
}
