import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AvenueService } from './avenue.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';

import {
  AvenueCreateDto,
  AvenueUpdateDto,
  AvenueInterfaces,
} from 'types/organization/avenue';

@ApiBearerAuth()
@ApiTags('avenue')
@Controller('avenue')
export class AvenueController {
  constructor(private readonly avenueService: AvenueService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListOfCategory(
    @Query() query: ListQueryDto
  ): Promise<AvenueInterfaces.Response[]> {
    return await this.avenueService.getListOfCategory(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<AvenueInterfaces.Response> {
    return this.avenueService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: AvenueCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: AvenueCreateDto
  ): Promise<AvenueInterfaces.Response> {
    
    
    return this.avenueService.create(data);
  }

  @Put(':id')
  @ApiBody({ type: AvenueUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<AvenueUpdateDto, 'id'>
  ): Promise<AvenueInterfaces.Response> {
    return this.avenueService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete', ParseBoolPipe) deleteQuery?: boolean
  ): Promise<AvenueInterfaces.Response> {
    return this.avenueService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<AvenueInterfaces.Response> {
    return this.avenueService.restore({ id });
  }
}
