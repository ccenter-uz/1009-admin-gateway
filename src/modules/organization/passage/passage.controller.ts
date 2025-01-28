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
import { CityRegionFilterDto } from 'types/global/dto/city-region-filter.dto';

@ApiBearerAuth()
@ApiTags('passage')
@Controller('passage')
export class PassageController {
  constructor(private readonly passageService: PassageService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() query: CityRegionFilterDto
  ): Promise<PassageInterfaces.Response[]> {
    return await this.passageService.getAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<PassageInterfaces.Response> {
    return this.passageService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: PassageCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: PassageCreateDto,
    @Req() request: Request
  ): Promise<PassageInterfaces.Response> {
    return this.passageService.create(
      data,
      request.body['userData'].user.numericId
    );
  }

  @Put(':id')
  @ApiBody({ type: PassageUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<PassageUpdateDto, 'id'>
  ): Promise<PassageInterfaces.Response> {
    return this.passageService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<PassageInterfaces.Response> {
    return this.passageService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<PassageInterfaces.Response> {
    return this.passageService.restore({ id });
  }
}
