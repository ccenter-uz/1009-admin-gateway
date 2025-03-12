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
import { CityRegionFilterDto } from 'types/global/dto/city-region-filter.dto';

@ApiBearerAuth()
@ApiTags('avenue')
@Controller('avenue')
export class AvenueController {
  constructor(private readonly avenueService: AvenueService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Req() request: Request,
    @Query() query: CityRegionFilterDto
  ): Promise<AvenueInterfaces.Response[]> {
    return await this.avenueService.getAll({
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
  ): Promise<AvenueInterfaces.Response> {
    return this.avenueService.getById({
      id,
      ...query,
      logData: request['userData'],
    });
  }

  @Post()
  @ApiBody({ type: AvenueCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: AvenueCreateDto,
    @Req() request: Request
  ): Promise<AvenueInterfaces.Response> {
    return this.avenueService.create({
      ...data,
      staffNumber: request['userData'].user.numericId,
      logData: request['userData'],
    });
  }

  @Put(':id')
  @ApiBody({ type: AvenueUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<AvenueUpdateDto, 'id'>
  ): Promise<AvenueInterfaces.Response> {
    return this.avenueService.update({
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
    @Query('delete') deleteQuery?: boolean
  ): Promise<AvenueInterfaces.Response> {
    return this.avenueService.delete({
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
  ): Promise<AvenueInterfaces.Response> {
    return this.avenueService.restore({ id, logData: request['userData'] });
  }
}
