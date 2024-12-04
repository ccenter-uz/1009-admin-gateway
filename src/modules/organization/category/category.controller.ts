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
import { CategoryService } from './category.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';
import {
  CategoryCreateDto,
  CategoryInterfaces,
  CategoryUpdateDto,
} from 'types/organization/category';

@ApiBearerAuth()
@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListOfCategory(
    @Query() query: ListQueryDto
  ): Promise<CategoryInterfaces.Response[]> {
    return await this.categoryService.getListOfCategory(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<CategoryInterfaces.Response> {
    return this.categoryService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: CategoryCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: CategoryCreateDto,
    @Req() request: Request
  ): Promise<CategoryInterfaces.Response> {
    return this.categoryService.create(data, request['userNumericId']);
  }

  @Put(':id')
  @ApiBody({ type: CategoryUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<CategoryUpdateDto, 'id'>
  ): Promise<CategoryInterfaces.Response> {
    return this.categoryService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete',) deleteQuery?: boolean
  ): Promise<CategoryInterfaces.Response> {
    return this.categoryService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<CategoryInterfaces.Response> {
    return this.categoryService.restore({ id });
  }
}
