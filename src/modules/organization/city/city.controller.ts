import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CityService } from './city.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

import {
  CityCreateDto,
  CityInterfaces,
} from 'types/organization/city';
import { CityFilterDto } from 'types/organization/city/dto/filter-city.dto';

@ApiBearerAuth()
@ApiTags('city')
@Controller('city')
export class CityController {
  constructor(private readonly subCategoryService: CityService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Req() request: Request,
    @Query() query: CityFilterDto
  ): Promise<CityInterfaces.Response[]> {
    return await this.subCategoryService.getAll({
      ...query,
      logData: request['userData'],
    });
  }

  // @Get(':id')
  // @ApiParam({ name: 'id' })
  // @HttpCode(HttpStatus.OK)
  // async getById(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Query() query: LanguageRequestDto
  // ): Promise<CityInterfaces.Response> {
  //   return this.subCategoryService.getById({ id, ...query });
  // }

  @Post()
  @ApiBody({ type: CityCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CityCreateDto): Promise<CityInterfaces.Response> {
    return this.subCategoryService.create(data);
  }

  // @Put(':id')
  // @ApiBody({ type: CityUpdateDto })
  // @HttpCode(HttpStatus.OK)
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() data: Omit<CityUpdateDto, 'id'>
  // ): Promise<CityInterfaces.Response> {
  //   return this.subCategoryService.update({ ...data, id });
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.OK)
  // async delete(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Query('delete') deleteQuery?: boolean
  // ): Promise<CityInterfaces.Response> {
  //   return this.subCategoryService.delete({ id, delete: deleteQuery });
  // }

  // @Put(':id/restore')
  // @HttpCode(HttpStatus.OK)
  // async restore(
  //   @Param('id', ParseIntPipe) id: number
  // ): Promise<CityInterfaces.Response> {
  //   return this.subCategoryService.restore({ id });
  // }
}
