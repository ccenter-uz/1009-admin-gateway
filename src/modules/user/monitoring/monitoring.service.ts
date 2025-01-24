import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { USER } from 'types/config';
import {
  MonitoringServiceCommands as Commands,
  MonitoringInterfaces,
} from 'types/user/monitoring';
import { MonitoringFilterDto } from 'types/organization/monitoring';

@Injectable()
export class MonitoringService {
  constructor(@Inject(USER) private adminClient: ClientProxy) {}

  async getAll(
    query: MonitoringFilterDto
  ): Promise<MonitoringInterfaces.UserResponse[]> {
    return lastValueFrom(
      this.adminClient.send<
        MonitoringInterfaces.UserResponse[],
        MonitoringFilterDto
      >({ cmd: Commands.GET_ALL_LIST }, query)
    );
  }
}
