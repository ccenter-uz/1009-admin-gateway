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
import { NearbyService } from './nearby.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';
import {
  NearbyCreateDto,
  NearbyUpdateDto,
  NearbyInterfaces,
  NearbyFilterDto,
} from 'types/organization/nearby';

@ApiBearerAuth()
@ApiTags('nearby')
@Controller('nearby')
export class NearbyController {
  constructor(private readonly nearbyService: NearbyService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Req() request: Request,
    @Query() query: NearbyFilterDto
  ): Promise<NearbyInterfaces.Response[]> {
    return await this.nearbyService.getAll({
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
  ): Promise<NearbyInterfaces.Response> {
    return this.nearbyService.getById({
      id,
      ...query,
      logData: request['userData'],
    });
  }

  @Post()
  @ApiBody({ type: NearbyCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: NearbyCreateDto,
    @Req() request: Request
  ): Promise<NearbyInterfaces.Response> {
    return this.nearbyService.create({
      ...data,
      staffNumber: request['userData'].user.numericId,
      logData: request['userData'],
    });
  }

  @Put(':id')
  @ApiBody({ type: NearbyUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<NearbyUpdateDto, 'id'>
  ): Promise<NearbyInterfaces.Response> {
    return this.nearbyService.update({
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
  ): Promise<NearbyInterfaces.Response> {
    return this.nearbyService.delete({
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
  ): Promise<NearbyInterfaces.Response> {
    return this.nearbyService.restore({ id, logData: request['userData'] });
  }
}
