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

@ApiBearerAuth()
@ApiTags('lane')
@Controller('lane')
export class LaneController {
  constructor(private readonly laneService: LaneService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListOfCategory(
    @Query() query: ListQueryDto
  ): Promise<LaneInterfaces.Response[]> {
    return await this.laneService.getListOfCategory(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<LaneInterfaces.Response> {
    return this.laneService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: LaneCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: LaneCreateDto,
    @Req() request: Request
  ): Promise<LaneInterfaces.Response> {


    return this.laneService.create(data, request['userNumericId']);
  }

  @Put(':id')
  @ApiBody({ type: LaneUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<LaneUpdateDto, 'id'>
  ): Promise<LaneInterfaces.Response> {
    return this.laneService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<LaneInterfaces.Response> {
    return this.laneService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<LaneInterfaces.Response> {
    return this.laneService.restore({ id });
  }
}
