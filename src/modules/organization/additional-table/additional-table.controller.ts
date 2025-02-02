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
import { AdditionalTableService } from './additional-table.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto } from 'types/global';
import {
  AdditionalTableCreateDto,
  AdditionalTableInterfaces,
  AdditionalTableUpdateDto,
} from 'types/organization/additional-table';
import { AdditionalTableFilterDto } from 'types/organization/additional-table/dto/filter-additional-table.dto';

@ApiBearerAuth()
@ApiTags('additional-table')
@Controller('additional-table')
export class AdditionalTableController {
  constructor(
    private readonly additionalTableService: AdditionalTableService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Req() request: Request,
    @Query() query: AdditionalTableFilterDto
  ): Promise<AdditionalTableInterfaces.Response[]> {
    return await this.additionalTableService.getAll({
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
  ): Promise<AdditionalTableInterfaces.Response> {
    return this.additionalTableService.getById({
      id,
      ...query,
      logData: request['userData'],
    });
  }

  @Post()
  @ApiBody({ type: AdditionalTableCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: AdditionalTableCreateDto,
    @Req() request: Request
  ): Promise<AdditionalTableInterfaces.Response> {
    return this.additionalTableService.create({
      ...data,
      staffNumber: request['userData'].user.numericId,
      logData: request['userData'],
    });
  }

  @Put(':id')
  @ApiBody({ type: AdditionalTableUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<AdditionalTableUpdateDto, 'id'>
  ): Promise<AdditionalTableInterfaces.Response> {
    return this.additionalTableService.update({
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
  ): Promise<AdditionalTableInterfaces.Response> {
    return this.additionalTableService.delete({
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
  ): Promise<AdditionalTableInterfaces.Response> {
    return this.additionalTableService.restore({
      id,
      logData: request['userData'],
    });
  }
}
