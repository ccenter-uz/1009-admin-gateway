import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import {
  CategoryCreateDto,
  CategoryUpdateDto,
} from 'types/organization/category';
import {
  SectionInterfaces,
  SectionServiceCommands as Commands,
  SectionCreateDto,
  SectionUpdateDto,
} from 'types/organization/section';

@Injectable()
export class SectionService {
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getListOfCategory(
    query: ListQueryDto
  ): Promise<SectionInterfaces.Response[]> {
    return lastValueFrom(
      this.adminClient.send<SectionInterfaces.Response[], ListQueryDto>(
        { cmd: Commands.GET_ALL_LIST },
        query
      )
    );
  }

  async getById(data: GetOneDto): Promise<SectionInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<SectionInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
  }

  async create(data: SectionCreateDto): Promise<SectionInterfaces.Response> {
    return await lastValueFrom(
      this.adminClient.send<
        SectionInterfaces.Response,
        SectionInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
  }

  async update(data: SectionUpdateDto): Promise<SectionInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<
        SectionInterfaces.Response,
        SectionInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
  }

  async delete(data: DeleteDto): Promise<SectionInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<SectionInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
  }

  async restore(data: GetOneDto): Promise<SectionInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<SectionInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
  }
}
