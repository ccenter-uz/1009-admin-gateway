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
import { ImpasseService } from './impasse.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';
import {
  ImpasseCreateDto,
  ImpasseUpdateDto,
  ImpasseInterfaces,
} from 'types/organization/impasse';
import { CityRegionFilterDto } from 'types/global/dto/city-region-filter.dto';

@ApiBearerAuth()
@ApiTags('impasse')
@Controller('impasse')
export class ImpasseController {
  constructor(private readonly impasseService: ImpasseService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Req() request: Request,
    @Query() query: CityRegionFilterDto
  ): Promise<ImpasseInterfaces.Response[]> {
    return await this.impasseService.getAll({
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
  ): Promise<ImpasseInterfaces.Response> {
    return this.impasseService.getById({
      id,
      ...query,
      logData: request['userData'],
    });
  }

  @Post()
  @ApiBody({ type: ImpasseCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: ImpasseCreateDto,
    @Req() request: Request
  ): Promise<ImpasseInterfaces.Response> {
    return this.impasseService.create({
      ...data,
      staffNumber: request['userData'].user.numericId,
      logData: request['userData'],
    });
  }

  @Put(':id')
  @ApiBody({ type: ImpasseUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<ImpasseUpdateDto, 'id'>
  ): Promise<ImpasseInterfaces.Response> {
    return this.impasseService.update({
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
  ): Promise<ImpasseInterfaces.Response> {
    return this.impasseService.delete({
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
  ): Promise<ImpasseInterfaces.Response> {
    return this.impasseService.restore({ id, logData: request['userData'] });
  }
}
