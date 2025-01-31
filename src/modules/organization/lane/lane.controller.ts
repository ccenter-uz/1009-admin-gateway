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
import { LaneService } from './lane.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';

import {
  LaneCreateDto,
  LaneUpdateDto,
  LaneInterfaces,
} from 'types/organization/lane';
import { CityRegionFilterDto } from 'types/global/dto/city-region-filter.dto';

@ApiBearerAuth()
@ApiTags('lane')
@Controller('lane')
export class LaneController {
  constructor(private readonly laneService: LaneService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Req() request: Request,
    @Query() query: CityRegionFilterDto
  ): Promise<LaneInterfaces.Response[]> {
    return await this.laneService.getAll({
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
  ): Promise<LaneInterfaces.Response> {
    return this.laneService.getById({
      id,
      ...query,
      logData: request['userData'],
    });
  }

  @Post()
  @ApiBody({ type: LaneCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: LaneCreateDto,
    @Req() request: Request
  ): Promise<LaneInterfaces.Response> {
    return this.laneService.create({
      ...data,
      staffNumber: request['userData'].user.numericId,
      logData: request['userData'],
    });
  }

  @Put(':id')
  @ApiBody({ type: LaneUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<LaneUpdateDto, 'id'>
  ): Promise<LaneInterfaces.Response> {
    return this.laneService.update({
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
  ): Promise<LaneInterfaces.Response> {
    return this.laneService.delete({
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
  ): Promise<LaneInterfaces.Response> {
    return this.laneService.restore({ id, logData: request['userData'] });
  }
}
