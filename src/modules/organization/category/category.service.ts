import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import { CityRegionFilterDto } from 'types/global-filters/city-region-filter';
import {
  CategoryCreateDto,
  CategoryInterfaces,
  CategoryUpdateDto,
  CategoryServiceCommands as Commands,
} from 'types/organization/category';

@Injectable()
export class CategoryService {
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(
    query: CityRegionFilterDto
  ): Promise<CategoryInterfaces.Response[]> {
    return lastValueFrom(
      this.adminClient.send<CategoryInterfaces.Response[], CityRegionFilterDto>(
        { cmd: Commands.GET_ALL_LIST },
        query
      )
    );
  }

  async getById(data: GetOneDto): Promise<CategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<CategoryInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
  }

  async create(data: CategoryCreateDto): Promise<CategoryInterfaces.Response> {
    return await lastValueFrom(
      this.adminClient.send<
        CategoryInterfaces.Response,
        CategoryInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
  }

  async update(data: CategoryUpdateDto): Promise<CategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<
        CategoryInterfaces.Response,
        CategoryInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
  }

  async delete(data: DeleteDto): Promise<CategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<CategoryInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
  }

  async restore(data: GetOneDto): Promise<CategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<CategoryInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
  }
}
