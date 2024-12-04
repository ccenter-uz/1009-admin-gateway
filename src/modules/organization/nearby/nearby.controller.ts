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
  NearbyInterfaces
} from 'types/organization/nearby';

@ApiBearerAuth()
@ApiTags('nearby')
@Controller('nearby')
export class NearbyController {
  constructor(private readonly nearbyService: NearbyService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListOfCategory(
    @Query() query: ListQueryDto
  ): Promise<NearbyInterfaces.Response[]> {
    return await this.nearbyService.getListOfCategory(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<NearbyInterfaces.Response> {
    return this.nearbyService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: NearbyCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: NearbyCreateDto,
    @Req() request: Request
  ): Promise<NearbyInterfaces.Response> {
    return this.nearbyService.create(data, request['userNumericId']);
  }

  @Put(':id')
  @ApiBody({ type: NearbyUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<NearbyUpdateDto, 'id'>
  ): Promise<NearbyInterfaces.Response> {
    return this.nearbyService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<NearbyInterfaces.Response> {
    return this.nearbyService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<NearbyInterfaces.Response> {
    return this.nearbyService.restore({ id });
  }
}
