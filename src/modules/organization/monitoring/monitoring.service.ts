import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import {
  MonitoringServiceCommands as Commands,
  MonitoringInterfaces,
} from 'types/organization/monitoring';
import { MonitoringFilterDto } from 'types/organization/monitoring';

@Injectable()
export class MonitoringService {
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(
    query: MonitoringFilterDto
  ): Promise<MonitoringInterfaces.OrganizationResponse[]> {
    return lastValueFrom(
      this.adminClient.send<
        MonitoringInterfaces.OrganizationResponse[],
        MonitoringFilterDto
      >({ cmd: Commands.GET_ALL_LIST }, query)
    );
  }
}
