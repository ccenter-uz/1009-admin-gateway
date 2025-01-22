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
import { VillageService } from './village.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';

import {
  VillageCreateDto,
  VillageUpdateDto,
  VillageInterfaces,
} from 'types/organization/village';
import { CityRegionFilterDto } from 'types/global-filters/city-region-filter';

@ApiBearerAuth()
@ApiTags('village')
@Controller('village')
export class VillageController {
  constructor(private readonly villageService: VillageService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() query: CityRegionFilterDto
  ): Promise<VillageInterfaces.Response[]> {
    return await this.villageService.getAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<VillageInterfaces.Response> {
    return this.villageService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: VillageCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: VillageCreateDto,
    @Req() request: Request
  ): Promise<VillageInterfaces.Response> {
    return this.villageService.create(
      data,
      request.body['userData'].user.numericId
    );
  }

  @Put(':id')
  @ApiBody({ type: VillageUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<VillageUpdateDto, 'id'>
  ): Promise<VillageInterfaces.Response> {
    return this.villageService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<VillageInterfaces.Response> {
    return this.villageService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<VillageInterfaces.Response> {
    return this.villageService.restore({ id });
  }
}
