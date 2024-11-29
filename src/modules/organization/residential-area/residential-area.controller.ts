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
import { ResidentialAreaService } from './residential-area.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';
import {
  ResidentialAreaCreateDto,
  ResidentialAreaUpdateDto,
  ResidentialAreaInterfaces,
} from 'types/organization/residential-area';

@ApiBearerAuth()
@ApiTags('residential-area')
@Controller('residential-area')
export class ResidentialAreaController {
  constructor(private readonly residentialAreaService: ResidentialAreaService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListOfCategory(
    @Query() query: ListQueryDto
  ): Promise<ResidentialAreaInterfaces.Response[]> {
    return await this.residentialAreaService.getListOfCategory(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<ResidentialAreaInterfaces.Response> {
    return this.residentialAreaService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: ResidentialAreaCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: ResidentialAreaCreateDto
  ): Promise<ResidentialAreaInterfaces.Response> {


    return this.residentialAreaService.create(data);
  }

  @Put(':id')
  @ApiBody({ type: ResidentialAreaUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<ResidentialAreaUpdateDto, 'id'>
  ): Promise<ResidentialAreaInterfaces.Response> {
    return this.residentialAreaService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<ResidentialAreaInterfaces.Response> {
    return this.residentialAreaService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResidentialAreaInterfaces.Response> {
    return this.residentialAreaService.restore({ id });
  }
}
