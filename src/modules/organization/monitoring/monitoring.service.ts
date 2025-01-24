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

  async getAllOrganizations(
    query: MonitoringFilterDto
  ): Promise<MonitoringInterfaces.Response[]> {
    return lastValueFrom(
      this.adminClient.send<
        MonitoringInterfaces.Response[],
        MonitoringFilterDto
      >({ cmd: Commands.GET_ALL_LIST }, query)
    );
  }

  // async getAllUsers(
  //   query: MonitoringFilterDto
  // ): Promise<MonitoringInterfaces.Response[]> {
  //   return lastValueFrom(
  //     this.adminClient.send<
  //       MonitoringInterfaces.Response[],
  //       MonitoringFilterDto
  //     >({ cmd: Commands.GET_ALL_LIST }, query)
  //   );
  // }
}
