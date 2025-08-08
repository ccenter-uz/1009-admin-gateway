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
import { NeighborhoodService } from './neighborhood.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';
import {
  NeighborhoodUpdateDto,
  NeighborhoodCreateDto,
  NeighborhoodInterfaces,
} from 'types/organization/neighborhood';
import { CityRegionFilterDto } from 'types/global/dto/city-region-filter.dto';

@ApiBearerAuth()
@ApiTags('neighborhood')
@Controller('neighborhood')
export class NeighborhoodController {
  constructor(private readonly residentialAreaService: NeighborhoodService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Req() request: Request,
    @Query() query: CityRegionFilterDto
  ): Promise<NeighborhoodInterfaces.Response[]> {
    return await this.residentialAreaService.getAll({
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
  ): Promise<NeighborhoodInterfaces.Response> {
    return this.residentialAreaService.getById({
      id,
      ...query,
    });
  }

  @Post()
  @ApiBody({ type: NeighborhoodCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: NeighborhoodCreateDto,
    @Req() request: Request
  ): Promise<NeighborhoodInterfaces.Response> {
    return this.residentialAreaService.create({
      ...data,
      staffNumber: request['userData'].user.numericId,
      logData: request['userData'],
    });
  }

  @Put(':id')
  @ApiBody({ type: NeighborhoodUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<NeighborhoodUpdateDto, 'id'>
  ): Promise<NeighborhoodInterfaces.Response> {
    return this.residentialAreaService.update({
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
  ): Promise<NeighborhoodInterfaces.Response> {
    return this.residentialAreaService.delete({
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
  ): Promise<NeighborhoodInterfaces.Response> {
    return this.residentialAreaService.restore({
      id,
      logData: request['userData'],
    });
  }
}
