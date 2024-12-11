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
import { SubCategoryService } from './sub-category.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';

import {
  SubCategoryCreateDto,
  SubCategoryFilterDto,
  SubCategoryInterfaces,
  SubCategoryUpdateDto,
} from 'types/organization/sub-category';

@ApiBearerAuth()
@ApiTags('sub-category')
@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() query: SubCategoryFilterDto
  ): Promise<SubCategoryInterfaces.Response[]> {
    return await this.subCategoryService.getAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<SubCategoryInterfaces.Response> {
    return this.subCategoryService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: SubCategoryCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: SubCategoryCreateDto,
    @Req() request: Request
  ): Promise<SubCategoryInterfaces.Response> {
    return this.subCategoryService.create(data, request['userNumericId']);
  }

  @Put(':id')
  @ApiBody({ type: SubCategoryUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<SubCategoryUpdateDto, 'id'>
  ): Promise<SubCategoryInterfaces.Response> {
    return this.subCategoryService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<SubCategoryInterfaces.Response> {
    return this.subCategoryService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<SubCategoryInterfaces.Response> {
    return this.subCategoryService.restore({ id });
  }
}
