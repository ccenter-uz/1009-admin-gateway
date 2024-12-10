import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import {
  LaneCreateDto,
  LaneUpdateDto,
  LaneInterfaces,
  LaneServiceCommands as Commands,
} from 'types/organization/lane';

@Injectable()
export class LaneService {
  private logger = new Logger(LaneService.name);
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getListOfCategory(
    query: ListQueryDto
  ): Promise<LaneInterfaces.Response[]> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, ListQueryDto);

    const response = lastValueFrom(
      this.adminClient.send<LaneInterfaces.Response[], ListQueryDto>(
        { cmd: Commands.GET_ALL_LIST },
        query
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async getById(data: GetOneDto): Promise<LaneInterfaces.Response> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<LaneInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async create(
    data: LaneCreateDto,
    userNumericId: string
  ): Promise<LaneInterfaces.Response> {
    const methodName: string = this.getListOfCategory.name;
    data = { staffNumber: userNumericId, ...data };
    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = await lastValueFrom(
      this.adminClient.send<LaneInterfaces.Response, LaneInterfaces.Request>(
        { cmd: Commands.CREATE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async update(data: LaneUpdateDto): Promise<LaneInterfaces.Response> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<LaneInterfaces.Response, LaneInterfaces.Update>(
        { cmd: Commands.UPDATE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async delete(data: DeleteDto): Promise<LaneInterfaces.Response> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<LaneInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async restore(data: GetOneDto): Promise<LaneInterfaces.Response> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<LaneInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }
}
