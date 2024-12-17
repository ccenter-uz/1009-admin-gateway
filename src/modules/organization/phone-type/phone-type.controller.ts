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
import { PhoneTypeService } from './phone-type.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';
import {
  PhoneTypeCreateDto,
  PhoneTypeUpdateDto,
  PhoneTypeInterfaces,
} from 'types/organization/phone-type';

@ApiBearerAuth()
@ApiTags('phone-type')
@Controller('phone-type')
export class PhoneTypeController {
  constructor(private readonly categoryService: PhoneTypeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() query: ListQueryDto
  ): Promise<PhoneTypeInterfaces.Response[]> {
    return await this.categoryService.getAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<PhoneTypeInterfaces.Response> {
    return this.categoryService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: PhoneTypeCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: PhoneTypeCreateDto,
    @Req() request: Request
  ): Promise<PhoneTypeInterfaces.Response> {
    return this.categoryService.create(data, request['userNumericId']);
  }

  @Put(':id')
  @ApiBody({ type: PhoneTypeUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<PhoneTypeUpdateDto, 'id'>
  ): Promise<PhoneTypeInterfaces.Response> {
    return this.categoryService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<PhoneTypeInterfaces.Response> {
    return this.categoryService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<PhoneTypeInterfaces.Response> {
    return this.categoryService.restore({ id });
  }
}
