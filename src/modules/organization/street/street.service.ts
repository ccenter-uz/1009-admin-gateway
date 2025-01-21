import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import { CityRegionFilterDto } from 'types/global-filters/city-region-filter';
import {
  StreetCreateDto,
  StreetUpdateDto,
  StreetInterfaces,
  StreetServiceCommands as Commands,
} from 'types/organization/street';

@Injectable()
export class StreetService {
  private logger = new Logger(StreetService.name);
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(query: CityRegionFilterDto): Promise<StreetInterfaces.Response[]> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, CityRegionFilterDto);

    const response = lastValueFrom(
      this.adminClient.send<StreetInterfaces.Response[], CityRegionFilterDto>(
        { cmd: Commands.GET_ALL_LIST },
        query
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async getById(data: GetOneDto): Promise<StreetInterfaces.Response> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<StreetInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async create(
    data: StreetCreateDto,
    userNumericId: string
  ): Promise<StreetInterfaces.Response> {
    const methodName: string = this.getAll.name;
    data = { staffNumber: userNumericId, ...data };
    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = await lastValueFrom(
      this.adminClient.send<
        StreetInterfaces.Response,
        StreetInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async update(data: StreetUpdateDto): Promise<StreetInterfaces.Response> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<StreetInterfaces.Response, StreetInterfaces.Update>(
        { cmd: Commands.UPDATE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async delete(data: DeleteDto): Promise<StreetInterfaces.Response> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<StreetInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async restore(data: GetOneDto): Promise<StreetInterfaces.Response> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<StreetInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }
}
