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
import { AvenueService } from './avenue.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';

import {
  AvenueCreateDto,
  AvenueUpdateDto,
  AvenueInterfaces,
} from 'types/organization/avenue';
import { CityRegionFilterDto } from 'types/global-filters/city-region-filter';

@ApiBearerAuth()
@ApiTags('avenue')
@Controller('avenue')
export class AvenueController {
  constructor(private readonly avenueService: AvenueService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() query: CityRegionFilterDto
  ): Promise<AvenueInterfaces.Response[]> {
    return await this.avenueService.getAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<AvenueInterfaces.Response> {
    return this.avenueService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: AvenueCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: AvenueCreateDto,
    @Req() request: Request
  ): Promise<AvenueInterfaces.Response> {
    return this.avenueService.create(
      data,
      request.body['userData'].user.numericId
    );
  }

  @Put(':id')
  @ApiBody({ type: AvenueUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<AvenueUpdateDto, 'id'>
  ): Promise<AvenueInterfaces.Response> {
    return this.avenueService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<AvenueInterfaces.Response> {
    return this.avenueService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<AvenueInterfaces.Response> {
    return this.avenueService.restore({ id });
  }
}
