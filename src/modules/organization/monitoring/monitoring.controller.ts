import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MonitoringService } from './monitoring.service';
import {
  MonitoringFilterDto,
  MonitoringInterfaces,
} from 'types/organization/monitoring';

@ApiBearerAuth()
@ApiTags('monitoring')
@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Get('organization')
  @HttpCode(HttpStatus.OK)
  async getAllOrganizations(
    @Req() request: Request,
    @Query() query: MonitoringFilterDto
  ): Promise<MonitoringInterfaces.Response[]> {
    return await this.monitoringService.getAllOrganizations({
      ...query,
      staffNumber: request['userData'].user.numericId,
      role: request['userData'].user.role,
    });
  }

  // @Get('user')
  // @HttpCode(HttpStatus.OK)
  // async getAllUsers(
  //   @Query() query: MonitoringFilterDto
  // ): Promise<MonitoringInterfaces.Response[]> {
  //   return await this.monitoringService.getAllUsers(query);
  // }
}
