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
import { PassageService } from './passage.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';

import {
  PassageCreateDto,
  PassageUpdateDto,
  PassageInterfaces,
} from 'types/organization/passage';
import { CityRegionFilterDto } from 'types/global-filters/city-region-filter';

@ApiBearerAuth()
@ApiTags('passage')
@Controller('passage')
export class PassageController {
  constructor(private readonly passageService: PassageService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Req() request: Request,
    @Query() query: CityRegionFilterDto
  ): Promise<PassageInterfaces.Response[]> {
    return await this.passageService.getAll({
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
  ): Promise<PassageInterfaces.Response> {
    return this.passageService.getById({
      id,
      ...query,
      logData: request['userData'],
    });
  }

  @Post()
  @ApiBody({ type: PassageCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: PassageCreateDto,
    @Req() request: Request
  ): Promise<PassageInterfaces.Response> {
    return this.passageService.create({
      ...data,
      staffNumber: request['userData'].user.numericId,
      logData: request['userData'],
    });
  }

  @Put(':id')
  @ApiBody({ type: PassageUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<PassageUpdateDto, 'id'>
  ): Promise<PassageInterfaces.Response> {
    return this.passageService.update({
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
  ): Promise<PassageInterfaces.Response> {
    return this.passageService.delete({
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
  ): Promise<PassageInterfaces.Response> {
    return this.passageService.restore({ id, logData: request['userData'] });
  }
}
