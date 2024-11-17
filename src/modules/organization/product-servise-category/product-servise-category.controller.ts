import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductServiceCategoryService } from './product-servise-category.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';
import {
  ProductServiseCategoryCreateDto,
  ProductServiseCategoryInterfaces,
  ProductServiseCategoryUpdateDto,
} from 'types/organization/product-service-category';

@ApiBearerAuth()
@ApiTags('product-servise-category')
@Controller('product-servise-category')
export class ProductServiceCategoryController {
  constructor(
    private readonly productServicecategoryService: ProductServiceCategoryService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListOfCategory(
    @Query() query: ListQueryDto
  ): Promise<ProductServiseCategoryInterfaces.Response[]> {
    return await this.productServicecategoryService.getListOfCategory(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<ProductServiseCategoryInterfaces.Response> {
    return this.productServicecategoryService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: ProductServiseCategoryCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: ProductServiseCategoryCreateDto
  ): Promise<ProductServiseCategoryInterfaces.Response> {
    return this.productServicecategoryService.create(data);
  }

  @Put(':id')
  @ApiBody({ type: ProductServiseCategoryUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<ProductServiseCategoryUpdateDto, 'id'>
  ): Promise<ProductServiseCategoryInterfaces.Response> {
    return this.productServicecategoryService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete', ParseBoolPipe) deleteQuery?: boolean
  ): Promise<ProductServiseCategoryInterfaces.Response> {
    return this.productServicecategoryService.delete({
      id,
      delete: deleteQuery,
    });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ProductServiseCategoryInterfaces.Response> {
    return this.productServicecategoryService.restore({ id });
  }
}