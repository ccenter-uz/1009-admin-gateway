import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MainOrganizationInterfaces } from 'types/organization/main-organization';
import { MonitoringService } from './monitoring.service';
import { MonitoringFilterDto } from 'types/organization/monitoring';

@ApiBearerAuth()
@ApiTags('monitoring')
@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() query: MonitoringFilterDto
  ): Promise<MainOrganizationInterfaces.Response[]> {
    return await this.monitoringService.getAll(query);
  }
}
