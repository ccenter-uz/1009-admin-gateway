import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import { CityRegionFilterDto } from 'types/global/dto/city-region-filter.dto';
import {
  PassageCreateDto,
  PassageUpdateDto,
  PassageInterfaces,
  PassageServiceCommands as Commands,
} from 'types/organization/passage';

@Injectable()
export class PassageService {
  private logger = new Logger(PassageService.name);

  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(
    query: CityRegionFilterDto
  ): Promise<PassageInterfaces.Response[]> {
    const methodName: string = this.getAll.name;
    this.logger.debug(`Method: ${methodName} - Request: `, query);

    const response = lastValueFrom(
      this.adminClient.send<PassageInterfaces.Response[], CityRegionFilterDto>(
        { cmd: Commands.GET_ALL_LIST },
        query
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async getById(data: GetOneDto): Promise<PassageInterfaces.Response> {
    const methodName: string = this.getById.name;
    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<PassageInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async create(data: PassageCreateDto): Promise<PassageInterfaces.Response> {
    const methodName: string = this.create.name;
    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = await lastValueFrom(
      this.adminClient.send<
        PassageInterfaces.Response,
        PassageInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async update(data: PassageUpdateDto): Promise<PassageInterfaces.Response> {
    const methodName: string = this.update.name;
    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<
        PassageInterfaces.Response,
        PassageInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async delete(data: DeleteDto): Promise<PassageInterfaces.Response> {
    const methodName: string = this.delete.name;
    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<PassageInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async restore(data: GetOneDto): Promise<PassageInterfaces.Response> {
    const methodName: string = this.restore.name;
    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<PassageInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }
}
