import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import {
  ProductServiceSubCategoryCreateDto,
  ProductServiceSubCategoryUpdateDto,
  ProductServiceSubCategoryServiceCommands as Commands,
  ProductServiceSubCategoryInterfaces
} from 'types/organization/product-service-sub-category';
import { ProductServiceSubCategoryFilterDto } from 'types/organization/product-service-sub-category/dto/filter-product-service-sub-category.dto';

@Injectable()
export class ProductServiseSubCategoryService {
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) { }

  async getListOfCategory(
    query: ProductServiceSubCategoryFilterDto
  ): Promise<ProductServiceSubCategoryInterfaces.Response[]> {
    if (query.all) {
      return lastValueFrom(
        this.adminClient.send<ProductServiceSubCategoryInterfaces.Response[], ListQueryDto>(
          { cmd: Commands.GET_ALL_LIST },
          query
        )
      );
    }

    return lastValueFrom(
      this.adminClient.send<ProductServiceSubCategoryInterfaces.Response[], ListQueryDto>(
        { cmd: Commands.GET_LIST_BY_PAGINATION },
        query
      )
    );
  }

  async getById(data: GetOneDto): Promise<ProductServiceSubCategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<ProductServiceSubCategoryInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
  }

  async create(
    data: ProductServiceSubCategoryCreateDto, userNumericId: string
  ): Promise<ProductServiceSubCategoryInterfaces.Response> {
    data = { staffNumber: userNumericId, ...data };
    return await lastValueFrom(
      this.adminClient.send<
        ProductServiceSubCategoryInterfaces.Response,
        ProductServiceSubCategoryInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
  }

  async update(
    data: ProductServiceSubCategoryUpdateDto
  ): Promise<ProductServiceSubCategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<
        ProductServiceSubCategoryInterfaces.Response,
        ProductServiceSubCategoryInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
  }

  async delete(data: DeleteDto): Promise<ProductServiceSubCategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<ProductServiceSubCategoryInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
  }

  async restore(data: GetOneDto): Promise<ProductServiceSubCategoryInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<ProductServiceSubCategoryInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
  }
}
