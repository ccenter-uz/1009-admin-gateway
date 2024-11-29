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
} from '@nestjs/common';
import { ImpasseService } from './impasse.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';
import {
  ImpasseCreateDto,
  ImpasseUpdateDto,
  ImpasseInterfaces,
} from 'types/organization/impasse';

@ApiBearerAuth()
@ApiTags('impasse')
@Controller('impasse')
export class ImpasseController {
  constructor(private readonly impasseService: ImpasseService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListOfCategory(
    @Query() query: ListQueryDto
  ): Promise<ImpasseInterfaces.Response[]> {
    return await this.impasseService.getListOfCategory(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<ImpasseInterfaces.Response> {
    return this.impasseService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: ImpasseCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: ImpasseCreateDto
  ): Promise<ImpasseInterfaces.Response> {


    return this.impasseService.create(data);
  }

  @Put(':id')
  @ApiBody({ type: ImpasseUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<ImpasseUpdateDto, 'id'>
  ): Promise<ImpasseInterfaces.Response> {
    return this.impasseService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete', ) deleteQuery?: boolean
  ): Promise<ImpasseInterfaces.Response> {
    return this.impasseService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ImpasseInterfaces.Response> {
    return this.impasseService.restore({ id });
  }
}
