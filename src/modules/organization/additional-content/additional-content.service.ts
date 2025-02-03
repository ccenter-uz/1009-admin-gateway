import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import {
  AdditionalContentCreateDto,
  AdditionalContentInterfaces,
  AdditionalContentUpdateDto,
  AdditionalContentServiceCommands as Commands,
} from 'types/organization/additional-content';
import { AdditionalContentFilterDto } from 'types/organization/additional-content/dto/filter-additional-content.dto';

@Injectable()
export class AdditionalContentService {
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(
    query: AdditionalContentFilterDto
  ): Promise<AdditionalContentInterfaces.Response[]> {
    return lastValueFrom(
      this.adminClient.send<
        AdditionalContentInterfaces.Response[],
        AdditionalContentFilterDto
      >({ cmd: Commands.GET_ALL_LIST }, query)
    );
  }

  async getById(
    data: GetOneDto
  ): Promise<AdditionalContentInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<AdditionalContentInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
  }

  async create(
    data: AdditionalContentCreateDto
  ): Promise<AdditionalContentInterfaces.Response> {
    return await lastValueFrom(
      this.adminClient.send<
        AdditionalContentInterfaces.Response,
        AdditionalContentInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
  }

  async update(
    data: AdditionalContentUpdateDto
  ): Promise<AdditionalContentInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<
        AdditionalContentInterfaces.Response,
        AdditionalContentInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
  }

  async delete(data: DeleteDto): Promise<AdditionalContentInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<AdditionalContentInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
  }

  async restore(
    data: GetOneDto
  ): Promise<AdditionalContentInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<AdditionalContentInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
  }
}
