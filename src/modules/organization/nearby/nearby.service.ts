import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';

import {
  NearbyCreateDto,
  NearbyUpdateDto,
  NearbyInterfaces,
  NearbyServiceCommands as Commands,
} from 'types/organization/nearby';

@Injectable()
export class NearbyService {
  private logger = new Logger(NearbyService.name);
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getListOfCategory(
    query: ListQueryDto
  ): Promise<NearbyInterfaces.Response[]> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, ListQueryDto);

    const response = await lastValueFrom(
      this.adminClient.send<NearbyInterfaces.Response[], ListQueryDto>(
        { cmd: Commands.GET_ALL_LIST },
        query
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async getById(data: GetOneDto): Promise<NearbyInterfaces.Response> {
    const methodName: string = this.getById.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = await lastValueFrom(
      this.adminClient.send<NearbyInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async create(
    data: NearbyCreateDto,
    userNumericId: string
  ): Promise<NearbyInterfaces.Response> {
    const methodName: string = this.create.name;
    data = { staffNumber: userNumericId, ...data };
    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = await lastValueFrom(
      this.adminClient.send<
        NearbyInterfaces.Response,
        NearbyInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async update(data: NearbyUpdateDto): Promise<NearbyInterfaces.Response> {
    const methodName: string = this.update.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = await lastValueFrom(
      this.adminClient.send<NearbyInterfaces.Response, NearbyInterfaces.Update>(
        { cmd: Commands.UPDATE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async delete(data: DeleteDto): Promise<NearbyInterfaces.Response> {
    const methodName: string = this.delete.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = await lastValueFrom(
      this.adminClient.send<NearbyInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async restore(data: GetOneDto): Promise<NearbyInterfaces.Response> {
    const methodName: string = this.restore.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = await lastValueFrom(
      this.adminClient.send<NearbyInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }
}
