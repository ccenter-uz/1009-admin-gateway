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
import { AreaService } from './area.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';

import {
  AreaCreateDto,
  AreaUpdateDto,
  AreaInterfaces,
} from 'types/organization/area';

@ApiBearerAuth()
@ApiTags('area')
@Controller('area')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() query: ListQueryDto
  ): Promise<AreaInterfaces.Response[]> {
    return await this.areaService.getAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<AreaInterfaces.Response> {
    return this.areaService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: AreaCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: AreaCreateDto,
    @Req() request: Request
  ): Promise<AreaInterfaces.Response> {
    return this.areaService.create(data, request['userNumericId']);
  }

  @Put(':id')
  @ApiBody({ type: AreaUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<AreaUpdateDto, 'id'>
  ): Promise<AreaInterfaces.Response> {
    return this.areaService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<AreaInterfaces.Response> {
    return this.areaService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<AreaInterfaces.Response> {
    return this.areaService.restore({ id });
  }
}
