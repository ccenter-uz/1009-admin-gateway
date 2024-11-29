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
} from '@nestjs/common';
import { NearbyCategoryService } from './nearby-category.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';
import {
  NearbyCategoryCreateDto,
  NearbyCategoryUpdateDto,
  NearbyCategoryInterfaces,
} from 'types/organization/nearby-category';

@ApiBearerAuth()
@ApiTags('nearby-category')
@Controller('nearby-category')
export class NearbyCategoryController {
  constructor(private readonly categoryService: NearbyCategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListOfCategory(
    @Query() query: ListQueryDto
  ): Promise<NearbyCategoryInterfaces.Response[]> {
    return await this.categoryService.getListOfCategory(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<NearbyCategoryInterfaces.Response> {
    return this.categoryService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: NearbyCategoryCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: NearbyCategoryCreateDto
  ): Promise<NearbyCategoryInterfaces.Response> {
    return this.categoryService.create(data);
  }

  @Put(':id')
  @ApiBody({ type: NearbyCategoryUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<NearbyCategoryUpdateDto, 'id'>
  ): Promise<NearbyCategoryInterfaces.Response> {
    return this.categoryService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<NearbyCategoryInterfaces.Response> {
    return this.categoryService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<NearbyCategoryInterfaces.Response> {
    return this.categoryService.restore({ id });
  }
}
