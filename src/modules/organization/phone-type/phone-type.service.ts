import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';

import {
  PhoneTypeCreateDto,
  PhoneTypeUpdateDto,
  PhoneTypeInterfaces,
  PhoneTypeServiceCommands as Commands,
} from 'types/organization/phone-type';

@Injectable()
export class PhoneTypeService {
  private logger = new Logger(PhoneTypeService.name);
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(query: ListQueryDto): Promise<PhoneTypeInterfaces.Response[]> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, ListQueryDto);

    const response = await lastValueFrom(
      this.adminClient.send<PhoneTypeInterfaces.Response[], ListQueryDto>(
        { cmd: Commands.GET_ALL_LIST },
        query
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async getById(data: GetOneDto): Promise<PhoneTypeInterfaces.Response> {
    const methodName: string = this.getById.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = await lastValueFrom(
      this.adminClient.send<PhoneTypeInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async create(
    data: PhoneTypeCreateDto
  ): Promise<PhoneTypeInterfaces.Response> {
    const methodName: string = this.create.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = await lastValueFrom(
      this.adminClient.send<
        PhoneTypeInterfaces.Response,
        PhoneTypeInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async update(
    data: PhoneTypeUpdateDto
  ): Promise<PhoneTypeInterfaces.Response> {
    const methodName: string = this.update.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = await lastValueFrom(
      this.adminClient.send<
        PhoneTypeInterfaces.Response,
        PhoneTypeInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async delete(data: DeleteDto): Promise<PhoneTypeInterfaces.Response> {
    const methodName: string = this.delete.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = await lastValueFrom(
      this.adminClient.send<PhoneTypeInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async restore(data: GetOneDto): Promise<PhoneTypeInterfaces.Response> {
    const methodName: string = this.restore.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = await lastValueFrom(
      this.adminClient.send<PhoneTypeInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }
}
