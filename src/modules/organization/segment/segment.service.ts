import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import { ListQueryWithOrderDto } from 'types/global/dto/list-query-with-order.dto';
import {
  SegmentCreateDto,
  SegmentInterfaces,
  SegmentUpdateDto,
  SegmentServiceCommands as Commands,
} from 'types/organization/segment';

@Injectable()
export class SegmentService {
  private logger = new Logger(SegmentService.name);

  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(
    query: ListQueryWithOrderDto
  ): Promise<SegmentInterfaces.Response[]> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, query);
    const response = lastValueFrom(
      this.adminClient.send<
        SegmentInterfaces.Response[],
        ListQueryWithOrderDto
      >({ cmd: Commands.GET_ALL_LIST }, query)
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async getById(data: GetOneDto): Promise<SegmentInterfaces.Response> {
    const methodName: string = this.getById.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<SegmentInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async create(data: SegmentCreateDto): Promise<SegmentInterfaces.Response> {
    const methodName: string = this.create.name;
    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = await lastValueFrom(
      this.adminClient.send<
        SegmentInterfaces.Response,
        SegmentInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async update(data: SegmentUpdateDto): Promise<SegmentInterfaces.Response> {
    const methodName: string = this.update.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<
        SegmentInterfaces.Response,
        SegmentInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async delete(data: DeleteDto): Promise<SegmentInterfaces.Response> {
    const methodName: string = this.delete.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<SegmentInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async restore(data: GetOneDto): Promise<SegmentInterfaces.Response> {
    const methodName: string = this.restore.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<SegmentInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }
}
