import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import {
  ImpasseCreateDto,
  ImpasseUpdateDto,
  ImpasseInterfaces,
  ImpasseServiceCommands as Commands,
} from 'types/organization/impasse';

@Injectable()
export class ImpasseService {
  private logger = new Logger(ImpasseService.name);
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) { }

  async getListOfCategory(
    query: ListQueryDto
  ): Promise<ImpasseInterfaces.Response[]> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, ListQueryDto);
    if (query.all) {
      const response = lastValueFrom(
        this.adminClient.send<ImpasseInterfaces.Response[], ListQueryDto>(
          { cmd: Commands.GET_ALL_LIST },
          query
        )
      );
      this.logger.debug(`Method: ${methodName} - Response: `, response);
      return response;
    }

    const response = lastValueFrom(
      this.adminClient.send<ImpasseInterfaces.Response[], ListQueryDto>(
        { cmd: Commands.GET_LIST_BY_PAGINATION },
        query
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async getById(data: GetOneDto): Promise<ImpasseInterfaces.Response> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<ImpasseInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async create(
    data: ImpasseCreateDto
  ): Promise<ImpasseInterfaces.Response> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = await lastValueFrom(
      this.adminClient.send<
        ImpasseInterfaces.Response,
        ImpasseInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async update(
    data: ImpasseUpdateDto
  ): Promise<ImpasseInterfaces.Response> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<
        ImpasseInterfaces.Response,
        ImpasseInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async delete(data: DeleteDto): Promise<ImpasseInterfaces.Response> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<ImpasseInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async restore(data: GetOneDto): Promise<ImpasseInterfaces.Response> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<ImpasseInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }
}