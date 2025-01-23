import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import {
  MainOrganizationInterfaces,
  MainOrganizationServiceCommands as Commands,
} from 'types/organization/main-organization';
import { MonitoringFilterDto } from 'types/organization/monitoring';

@Injectable()
export class MonitoringService {
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(
    query: MonitoringFilterDto
  ): Promise<MainOrganizationInterfaces.Response[]> {
    return lastValueFrom(
      this.adminClient.send<
        MainOrganizationInterfaces.Response[],
        MonitoringFilterDto
      >({ cmd: Commands.GET_ALL_LIST }, query)
    );
  }
}
