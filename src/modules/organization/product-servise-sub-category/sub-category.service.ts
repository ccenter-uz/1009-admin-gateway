import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import {
  ProductServiceSubCategoryCreateDto,
  ProductServiceSubCategoryUpdateDto,
  ProductServiceSubCategoryServiceCommands as Commands,
  ProductServiceSubCategoryInterfaces,
} from 'types/organization/product-service-sub-category';
import { ProductServiceSubCategoryDeleteDto } from 'types/organization/product-service-sub-category/dto/delete-product-service-sub-category.dto';
import { ProductServiceSubCategoryFilterDto } from 'types/organization/product-service-sub-category/dto/filter-product-service-sub-category.dto';

@Injectable()
export class ProductServiseSubCategoryService {
  private logger = new Logger(ProductServiseSubCategoryService.name);

  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(
    query: ProductServiceSubCategoryFilterDto
  ): Promise<ProductServiceSubCategoryInterfaces.Response[]> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, query);
    const response = lastValueFrom(
      this.adminClient.send<
        ProductServiceSubCategoryInterfaces.Response[],
        ListQueryDto
      >({ cmd: Commands.GET_ALL_LIST }, query)
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async getById(
    data: GetOneDto
  ): Promise<ProductServiceSubCategoryInterfaces.Response> {
    const methodName: string = this.getById.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<
        ProductServiceSubCategoryInterfaces.Response,
        GetOneDto
      >({ cmd: Commands.GET_BY_ID }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async create(
    data: ProductServiceSubCategoryCreateDto
  ): Promise<ProductServiceSubCategoryInterfaces.Response> {
    const methodName: string = this.create.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = await lastValueFrom(
      this.adminClient.send<
        ProductServiceSubCategoryInterfaces.Response,
        ProductServiceSubCategoryInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async update(
    data: ProductServiceSubCategoryUpdateDto
  ): Promise<ProductServiceSubCategoryInterfaces.Response> {
    const methodName: string = this.update.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<
        ProductServiceSubCategoryInterfaces.Response,
        ProductServiceSubCategoryInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async delete(
    data: ProductServiceSubCategoryDeleteDto
  ): Promise<ProductServiceSubCategoryInterfaces.Response> {
    const methodName: string = this.delete.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<
        ProductServiceSubCategoryInterfaces.Response,
        DeleteDto
      >({ cmd: Commands.DELETE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async restore(
    data: GetOneDto
  ): Promise<ProductServiceSubCategoryInterfaces.Response> {
    const methodName: string = this.restore.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);
    const response = lastValueFrom(
      this.adminClient.send<
        ProductServiceSubCategoryInterfaces.Response,
        GetOneDto
      >({ cmd: Commands.RESTORE }, data)
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }
}
