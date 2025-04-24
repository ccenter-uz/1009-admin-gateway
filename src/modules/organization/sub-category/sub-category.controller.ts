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
import { SubCategoryDeleteQueryDto } from 'types/organization/sub-category/dto/delete-sub-category.dto';

@ApiBearerAuth()
@ApiTags('sub-category')
@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Req() request: Request,
    @Query() query: SubCategoryFilterDto
  ): Promise<SubCategoryInterfaces.Response[]> {
    return await this.subCategoryService.getAll({
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
  ): Promise<SubCategoryInterfaces.Response> {
    return this.subCategoryService.getById({
      id,
      ...query,
      logData: request['userData'],
    });
  }

  @Post()
  @ApiBody({ type: SubCategoryCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: SubCategoryCreateDto,
    @Req() request: Request
  ): Promise<SubCategoryInterfaces.Response> {
    return this.subCategoryService.create({
      ...data,
      staffNumber: request['userData'].user.numericId,
      logData: request['userData'],
    });
  }

  @Put(':id')
  @ApiBody({ type: SubCategoryUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<SubCategoryUpdateDto, 'id'>
  ): Promise<SubCategoryInterfaces.Response> {
    return this.subCategoryService.update({
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
    @Query() query: SubCategoryDeleteQueryDto
  ): Promise<SubCategoryInterfaces.Response> {
    return this.subCategoryService.delete({
      id,
      delete: query.delete,
      deleteReason: query.deleteReason,
      logData: request['userData'],
    });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number
  ): Promise<SubCategoryInterfaces.Response> {
    return this.subCategoryService.restore({
      id,
      logData: request['userData'],
    });
  }
}
