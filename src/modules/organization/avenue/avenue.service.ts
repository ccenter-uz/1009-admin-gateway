import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import {
  AvenueCreateDto,
  AvenueUpdateDto,
  AvenueInterfaces,
  AvenueServiceCommands as Commands,
} from 'types/organization/avenue';

@Injectable()
export class AvenueService {
  private logger = new Logger(AvenueService.name);
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) { }

  async getListOfCategory(
    query: ListQueryDto
  ): Promise<AvenueInterfaces.Response[]> {

    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, ListQueryDto);
    if (query.all) {
      const response = lastValueFrom(
        this.adminClient.send<AvenueInterfaces.Response[], ListQueryDto>(
          { cmd: Commands.GET_ALL_LIST },
          query
        )
      );
      this.logger.debug(`Method: ${methodName} - Response: `, response);
      return response;
    }

    const response = lastValueFrom(
      this.adminClient.send<AvenueInterfaces.Response[], ListQueryDto>(
        { cmd: Commands.GET_LIST_BY_PAGINATION },
        query
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async getById(data: GetOneDto): Promise<AvenueInterfaces.Response> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<AvenueInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async create(
    data: AvenueCreateDto
  ): Promise<AvenueInterfaces.Response> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = await lastValueFrom(
      this.adminClient.send<
        AvenueInterfaces.Response,
        AvenueInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async update(
    data: AvenueUpdateDto
  ): Promise<AvenueInterfaces.Response> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<
        AvenueInterfaces.Response,
        AvenueInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async delete(data: DeleteDto): Promise<AvenueInterfaces.Response> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<AvenueInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async restore(data: GetOneDto): Promise<AvenueInterfaces.Response> {
    const methodName: string = this.getListOfCategory.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<AvenueInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }
}
