import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import { CityRegionFilterDto } from 'types/global-filters/city-region-filter';
import {
  AreaCreateDto,
  AreaUpdateDto,
  AreaInterfaces,
  AreaServiceCommands as Commands,
} from 'types/organization/area';

@Injectable()
export class AreaService {
  private logger = new Logger(AreaService.name);
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(query: CityRegionFilterDto): Promise<AreaInterfaces.Response[]> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, CityRegionFilterDto);

    const response = lastValueFrom(
      this.adminClient.send<AreaInterfaces.Response[], CityRegionFilterDto>(
        { cmd: Commands.GET_ALL_LIST },
        query
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async getById(data: GetOneDto): Promise<AreaInterfaces.Response> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<AreaInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async create(data: AreaCreateDto): Promise<AreaInterfaces.Response> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = await lastValueFrom(
      this.adminClient.send<AreaInterfaces.Response, AreaInterfaces.Request>(
        { cmd: Commands.CREATE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async update(data: AreaUpdateDto): Promise<AreaInterfaces.Response> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<AreaInterfaces.Response, AreaInterfaces.Update>(
        { cmd: Commands.UPDATE },
        data
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async delete(data: DeleteDto): Promise<AreaInterfaces.Response> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<AreaInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async restore(data: GetOneDto): Promise<AreaInterfaces.Response> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<AreaInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }
}
