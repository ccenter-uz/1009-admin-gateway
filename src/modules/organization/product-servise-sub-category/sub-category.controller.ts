import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ProductServiseSubCategoryService } from './sub-category.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';

import {
  ProductServiceSubCategoryCreateDto,
  ProductServiceSubCategoryInterfaces,
  ProductServiceSubCategoryUpdateDto,
} from 'types/organization/product-service-sub-category';
import { ProductServiceSubCategoryFilterDto } from 'types/organization/product-service-sub-category/dto/filter-product-service-sub-category.dto';

@ApiBearerAuth()
@ApiTags('product-servise-sub-category')
@Controller('product-servise-sub-category')
export class ProductServiseSubCategoryController {
  constructor(
    private readonly productServiseSubCategoryService: ProductServiseSubCategoryService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() query: ProductServiceSubCategoryFilterDto
  ): Promise<ProductServiceSubCategoryInterfaces.Response[]> {
    return await this.productServiseSubCategoryService.getAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<ProductServiceSubCategoryInterfaces.Response> {
    return this.productServiseSubCategoryService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: ProductServiceSubCategoryCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: ProductServiceSubCategoryCreateDto,
    @Req() request: Request
  ): Promise<ProductServiceSubCategoryInterfaces.Response> {
    return this.productServiseSubCategoryService.create(
      data,
      request['userNumericId']
    );
  }

  @Put(':id')
  @ApiBody({ type: ProductServiceSubCategoryUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<ProductServiceSubCategoryUpdateDto, 'id'>
  ): Promise<ProductServiceSubCategoryInterfaces.Response> {
    return this.productServiseSubCategoryService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<ProductServiceSubCategoryInterfaces.Response> {
    return this.productServiseSubCategoryService.delete({
      id,
      delete: deleteQuery,
    });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ProductServiceSubCategoryInterfaces.Response> {
    return this.productServiseSubCategoryService.restore({ id });
  }
}
