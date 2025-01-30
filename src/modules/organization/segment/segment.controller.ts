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
import { SegmentService } from './segment.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';
import {
  CategoryCreateDto,
  CategoryUpdateDto,
} from 'types/organization/category';
import {
  SegmentCreateDto,
  SegmentInterfaces,
  SegmentUpdateDto,
} from 'types/organization/segment';

@ApiBearerAuth()
@ApiTags('segment')
@Controller('segment')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Req() request: Request,
    @Query() query: ListQueryDto
  ): Promise<SegmentInterfaces.Response[]> {
    return await this.segmentService.getAll({
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
  ): Promise<SegmentInterfaces.Response> {
    return this.segmentService.getById({
      id,
      ...query,
      logData: request['userData'],
    });
  }

  @Post()
  @ApiBody({ type: SegmentCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() request: Request,
    @Body() data: SegmentCreateDto
  ): Promise<SegmentInterfaces.Response> {
    return this.segmentService.create({
      ...data,
      logData: request['userData'],
    });
  }

  @Put(':id')
  @ApiBody({ type: SegmentUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<SegmentUpdateDto, 'id'>
  ): Promise<SegmentInterfaces.Response> {
    return this.segmentService.update({
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
  ): Promise<SegmentInterfaces.Response> {
    return this.segmentService.delete({
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
  ): Promise<SegmentInterfaces.Response> {
    return this.segmentService.restore({ id, logData: request['userData'] });
  }
}
