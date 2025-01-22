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
import { AdditionalContentService } from './additional-content.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto } from 'types/global';
import {
  AdditionalContentCreateDto,
  AdditionalContentInterfaces,
  AdditionalContentUpdateDto,
} from 'types/organization/additional-content';
import { AdditionalContentFilterDto } from 'types/organization/additional-content/dto/filter-additional-content.dto';

@ApiBearerAuth()
@ApiTags('additional-content')
@Controller('additional-content')
export class AdditionalContentController {
  constructor(
    private readonly additionalContentService: AdditionalContentService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() query: AdditionalContentFilterDto
  ): Promise<AdditionalContentInterfaces.Response[]> {
    return await this.additionalContentService.getAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<AdditionalContentInterfaces.Response> {
    return this.additionalContentService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: AdditionalContentCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: AdditionalContentCreateDto,
    @Req() request: Request
  ): Promise<AdditionalContentInterfaces.Response> {
    return this.additionalContentService.create(
      data,
      request.body['userData'].user.numericId
    );
  }

  @Put(':id')
  @ApiBody({ type: AdditionalContentUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<AdditionalContentUpdateDto, 'id'>
  ): Promise<AdditionalContentInterfaces.Response> {
    return this.additionalContentService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<AdditionalContentInterfaces.Response> {
    return this.additionalContentService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<AdditionalContentInterfaces.Response> {
    return this.additionalContentService.restore({ id });
  }
}
