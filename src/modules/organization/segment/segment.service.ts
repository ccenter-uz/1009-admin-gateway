import { Inject, Injectable } from '@nestjs/common';
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
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(query: ListQueryWithOrderDto): Promise<SegmentInterfaces.Response[]> {
    return lastValueFrom(
      this.adminClient.send<SegmentInterfaces.Response[], ListQueryWithOrderDto>(
        { cmd: Commands.GET_ALL_LIST },
        query
      )
    );
  }

  async getById(data: GetOneDto): Promise<SegmentInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<SegmentInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
  }

  async create(data: SegmentCreateDto): Promise<SegmentInterfaces.Response> {
    return await lastValueFrom(
      this.adminClient.send<
        SegmentInterfaces.Response,
        SegmentInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
  }

  async update(data: SegmentUpdateDto): Promise<SegmentInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<
        SegmentInterfaces.Response,
        SegmentInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
  }

  async delete(data: DeleteDto): Promise<SegmentInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<SegmentInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
  }

  async restore(data: GetOneDto): Promise<SegmentInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<SegmentInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
  }
}
