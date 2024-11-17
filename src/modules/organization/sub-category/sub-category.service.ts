import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import {
  SubCategoryCreateDto,
  SubCategoryUpdateDto,
  SubCategoryServiceCommands as Commands,
} from 'types/organization/sub-category';
import { SubCategoryInterfaces } from 'types/organization/sub-category';

@Injectable()
export class SubCategoryService {
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getListOfCategory(
    query: ListQueryDto
  ): Promise<SubCategoryInterfaces.Response[]> {
    if (query.all) {
      return lastValueFrom(
        this.adminClient.send<SubCategoryInterfaces.Response[], ListQueryDto>(
          { cmd: Commands.GET_ALL_LIST },
          query
        )
      );
    }

    return lastValueFrom(
      this.adminClient.send<SubCategoryInterfaces.Response[], ListQueryDto>(
        { cmd: Commands.GET_LIST_BY_PAGINATION },
        query
      )
    );
  }

  async getById(data: GetOneDto): Promise<SubCategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<SubCategoryInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
  }

  async create(
    data: SubCategoryCreateDto
  ): Promise<SubCategoryInterfaces.Response> {
    return await lastValueFrom(
      this.adminClient.send<
        SubCategoryInterfaces.Response,
        SubCategoryInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
  }

  async update(
    data: SubCategoryUpdateDto
  ): Promise<SubCategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<
        SubCategoryInterfaces.Response,
        SubCategoryInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
  }

  async delete(data: DeleteDto): Promise<SubCategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<SubCategoryInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
  }

  async restore(data: GetOneDto): Promise<SubCategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<SubCategoryInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
  }
}