import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import {
  ProductServiseCategoryCreateDto,
  ProductServiseCategoryInterfaces,
  ProductServiseCategoryUpdateDto,
  ProductServiceCategoryServiceCommands as Commands,
} from 'types/organization/product-service-category';

@Injectable()
export class ProductServiceCategoryService {
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getListOfCategory(
    query: ListQueryDto
  ): Promise<ProductServiseCategoryInterfaces.Response[]> {
    return lastValueFrom(
      this.adminClient.send<
        ProductServiseCategoryInterfaces.Response[],
        ListQueryDto
      >({ cmd: Commands.GET_ALL_LIST }, query)
    );
  }

  async getById(
    data: GetOneDto
  ): Promise<ProductServiseCategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<
        ProductServiseCategoryInterfaces.Response,
        GetOneDto
      >({ cmd: Commands.GET_BY_ID }, data)
    );
  }

  async create(
    data: ProductServiseCategoryCreateDto,
    userNumericId: string
  ): Promise<ProductServiseCategoryInterfaces.Response> {
    data = { staffNumber: userNumericId, ...data };
    return await lastValueFrom(
      this.adminClient.send<
        ProductServiseCategoryInterfaces.Response,
        ProductServiseCategoryInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
  }

  async update(
    data: ProductServiseCategoryUpdateDto
  ): Promise<ProductServiseCategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<
        ProductServiseCategoryInterfaces.Response,
        ProductServiseCategoryInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
  }

  async delete(
    data: DeleteDto
  ): Promise<ProductServiseCategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<
        ProductServiseCategoryInterfaces.Response,
        DeleteDto
      >({ cmd: Commands.DELETE }, data)
    );
  }

  async restore(
    data: GetOneDto
  ): Promise<ProductServiseCategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<
        ProductServiseCategoryInterfaces.Response,
        GetOneDto
      >({ cmd: Commands.RESTORE }, data)
    );
  }
}
