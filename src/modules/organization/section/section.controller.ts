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
import { SectionService } from './section.service';
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
import { SectionCreateDto, SectionInterfaces, SectionUpdateDto } from 'types/organization/section';

@ApiBearerAuth()
@ApiTags('section')
@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListOfCategory(
    @Query() query: ListQueryDto
  ): Promise<SectionInterfaces.Response[]> {
    return await this.sectionService.getListOfCategory(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<SectionInterfaces.Response> {
    return this.sectionService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: SectionCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: SectionCreateDto
  ): Promise<SectionInterfaces.Response> {
    return this.sectionService.create(data);
  }

  @Put(':id')
  @ApiBody({ type: SectionUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<SectionUpdateDto, 'id'>
  ): Promise<SectionInterfaces.Response> {
    return this.sectionService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete', ParseBoolPipe) deleteQuery?: boolean
  ): Promise<SectionInterfaces.Response> {
    return this.sectionService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<SectionInterfaces.Response> {
    return this.sectionService.restore({ id });
  }
}
