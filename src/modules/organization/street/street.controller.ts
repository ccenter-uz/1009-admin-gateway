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
import { StreetService } from './street.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';

import {
  StreetCreateDto,
  StreetUpdateDto,
  StreetInterfaces,
} from 'types/organization/street';
import { CityRegionFilterDto } from 'types/global/dto/city-region-filter.dto';

@ApiBearerAuth()
@ApiTags('street')
@Controller('street')
export class StreetController {
  constructor(private readonly streetService: StreetService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() query: CityRegionFilterDto
  ): Promise<StreetInterfaces.Response[]> {
    return await this.streetService.getAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<StreetInterfaces.Response> {
    return this.streetService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: StreetCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: StreetCreateDto,
    @Req() request: Request
  ): Promise<StreetInterfaces.Response> {
    return this.streetService.create(
      data,
      request.body['userData'].user.numericId
    );
  }

  @Put(':id')
  @ApiBody({ type: StreetUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<StreetUpdateDto, 'id'>
  ): Promise<StreetInterfaces.Response> {
    return this.streetService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<StreetInterfaces.Response> {
    return this.streetService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<StreetInterfaces.Response> {
    return this.streetService.restore({ id });
  }
}
