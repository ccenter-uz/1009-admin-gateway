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
import { NearbyCategoryService } from './nearby-category.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';
import {
  NearbyCategoryCreateDto,
  NearbyCategoryUpdateDto,
  NearbyCategoryInterfaces,
} from 'types/organization/nearby-category';
import { ListQueryWithOrderDto } from 'types/global/dto/list-query-with-order.dto';

@ApiBearerAuth()
@ApiTags('nearby-category')
@Controller('nearby-category')
export class NearbyCategoryController {
  constructor(private readonly categoryService: NearbyCategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Req() request: Request,
    @Query() query: ListQueryWithOrderDto
  ): Promise<NearbyCategoryInterfaces.Response[]> {
    return await this.categoryService.getAll({
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
  ): Promise<NearbyCategoryInterfaces.Response> {
    return this.categoryService.getById({
      id,
      ...query,
      logData: request['userData'],
    });
  }

  @Post()
  @ApiBody({ type: NearbyCategoryCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: NearbyCategoryCreateDto,
    @Req() request: Request
  ): Promise<NearbyCategoryInterfaces.Response> {
    return this.categoryService.create({
      ...data,
      staffNumber: request['userData'].user.numericId,
      logData: request['userData'],
    });
  }

  @Put(':id')
  @ApiBody({ type: NearbyCategoryUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<NearbyCategoryUpdateDto, 'id'>
  ): Promise<NearbyCategoryInterfaces.Response> {
    return this.categoryService.update({
      ...data,
      id,
      staffNumber: request['userData'].user.numericId,
      logData: request['userData'],
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<NearbyCategoryInterfaces.Response> {
    return this.categoryService.delete({
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
  ): Promise<NearbyCategoryInterfaces.Response> {
    return this.categoryService.restore({ id, logData: request['userData'] });
  }
}
