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
import { ResidentialAreaService } from './residential-area.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';
import {
  ResidentialAreaCreateDto,
  ResidentialAreaUpdateDto,
  ResidentialAreaInterfaces,
} from 'types/organization/residential-area';
import { CityRegionFilterDto } from 'types/global-filters/city-region-filter';

@ApiBearerAuth()
@ApiTags('residential-area')
@Controller('residential-area')
export class ResidentialAreaController {
  constructor(
    private readonly residentialAreaService: ResidentialAreaService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Req() request: Request,
    @Query() query: CityRegionFilterDto
  ): Promise<ResidentialAreaInterfaces.Response[]> {
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
  ): Promise<ResidentialAreaInterfaces.Response> {
    return this.residentialAreaService.getById({
      id,
      ...query,
    });
  }

  @Post()
  @ApiBody({ type: ResidentialAreaCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: ResidentialAreaCreateDto,
    @Req() request: Request
  ): Promise<ResidentialAreaInterfaces.Response> {
    return this.residentialAreaService.create({
      ...data,
      staffNumber: request['userData'].user.numericId,
      logData: request['userData'],
    });
  }

  @Put(':id')
  @ApiBody({ type: ResidentialAreaUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<ResidentialAreaUpdateDto, 'id'>
  ): Promise<ResidentialAreaInterfaces.Response> {
    return this.residentialAreaService.update({
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
  ): Promise<ResidentialAreaInterfaces.Response> {
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
  ): Promise<ResidentialAreaInterfaces.Response> {
    return this.residentialAreaService.restore({
      id,
      logData: request['userData'],
    });
  }
}
