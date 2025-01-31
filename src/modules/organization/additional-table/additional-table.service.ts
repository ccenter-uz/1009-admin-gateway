import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import {
  AdditionalTableCreateDto,
  AdditionalTableInterfaces,
  AdditionalTableUpdateDto,
  AdditionalTableServiceCommands as Commands,
} from 'types/organization/additional-table';
import { AdditionalTableFilterDto } from 'types/organization/additional-table/dto/filter-additional-table.dto';

@Injectable()
export class AdditionalTableService {
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(
    query: AdditionalTableFilterDto
  ): Promise<AdditionalTableInterfaces.Response[]> {
    return lastValueFrom(
      this.adminClient.send<
        AdditionalTableInterfaces.Response[],
        AdditionalTableFilterDto
      >({ cmd: Commands.GET_ALL_LIST }, query)
    );
  }

  async getById(data: GetOneDto): Promise<AdditionalTableInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<AdditionalTableInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
  }

  async create(
    data: AdditionalTableCreateDto
  ): Promise<AdditionalTableInterfaces.Response> {
    return await lastValueFrom(
      this.adminClient.send<
        AdditionalTableInterfaces.Response,
        AdditionalTableInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
  }

  async update(
    data: AdditionalTableUpdateDto
  ): Promise<AdditionalTableInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<
        AdditionalTableInterfaces.Response,
        AdditionalTableInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
  }

  async delete(data: DeleteDto): Promise<AdditionalTableInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<AdditionalTableInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
  }

  async restore(data: GetOneDto): Promise<AdditionalTableInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<AdditionalTableInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
  }
}
