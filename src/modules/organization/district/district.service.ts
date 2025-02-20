import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import {
  DistrictCreateDto,
  DistrictUpdateDto,
  DistrictInterfaces,
  DistrictServiceCommands as Commands,
} from 'types/organization/district';
import { DistrictFilterDto } from 'types/organization/district/dto/filter-district.dto';

@Injectable()
export class DistrictService {
  private logger = new Logger(DistrictService.name);

  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(
    query: DistrictFilterDto
  ): Promise<DistrictInterfaces.Response[]> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, query);
    const response = lastValueFrom(
      this.adminClient.send<DistrictInterfaces.Response[], DistrictFilterDto>(
        { cmd: Commands.GET_ALL_LIST },
        query
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async getById(data: GetOneDto): Promise<DistrictInterfaces.Response> {
    
    const methodName: string = this.getById.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<DistrictInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async create(data: DistrictCreateDto): Promise<DistrictInterfaces.Response> {
    const methodName: string = this.create.name;
    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = await lastValueFrom(
      this.adminClient.send<
        DistrictInterfaces.Response,
        DistrictInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async update(data: DistrictUpdateDto): Promise<DistrictInterfaces.Response> {
    const methodName: string = this.update.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<
        DistrictInterfaces.Response,
        DistrictInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async delete(data: DeleteDto): Promise<DistrictInterfaces.Response> {
    const methodName: string = this.delete.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<DistrictInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async restore(data: GetOneDto): Promise<DistrictInterfaces.Response> {
    const methodName: string = this.restore.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<DistrictInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }
}
