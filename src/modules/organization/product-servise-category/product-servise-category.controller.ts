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
import { ProductServiceCategoryService } from './product-servise-category.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';
import {
  ProductServiseCategoryCreateDto,
  ProductServiseCategoryInterfaces,
  ProductServiseCategoryUpdateDto,
} from 'types/organization/product-service-category';
import { ListQueryWithOrderDto } from 'types/global/dto/list-query-with-order.dto';

@ApiBearerAuth()
@ApiTags('product-servise-category')
@Controller('product-servise-category')
export class ProductServiceCategoryController {
  constructor(
    private readonly productServiceCategoryService: ProductServiceCategoryService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Req() request: Request,
    @Query() query: ListQueryWithOrderDto
  ): Promise<ProductServiseCategoryInterfaces.Response[]> {
    return await this.productServiceCategoryService.getAll({
      ...query,
      logData: request['userData'],
    });
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<ProductServiseCategoryInterfaces.Response> {
    return this.productServiceCategoryService.getById({
      id,
      ...query,
      logData: request['userData'],
    });
  }

  @Post()
  @ApiBody({ type: ProductServiseCategoryCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: ProductServiseCategoryCreateDto,
    @Req() request: Request
  ): Promise<ProductServiseCategoryInterfaces.Response> {
    return this.productServiceCategoryService.create({
      ...data,
      staffNumber: request['userData'].user.numericId,
      logData: request['userData'],
    });
  }

  @Put(':id')
  @ApiBody({ type: ProductServiseCategoryUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<ProductServiseCategoryUpdateDto, 'id'>
  ): Promise<ProductServiseCategoryInterfaces.Response> {
    return this.productServiceCategoryService.update({
      ...data,
      id,
      logData: request['userData'],
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<ProductServiseCategoryInterfaces.Response> {
    return this.productServiceCategoryService.delete({
      id,
      delete: deleteQuery,
      logData: request['userData'],
    });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number
  ): Promise<ProductServiseCategoryInterfaces.Response> {
    return this.productServiceCategoryService.restore({
      id,
      logData: request['userData'],
    });
  }
}
