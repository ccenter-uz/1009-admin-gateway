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
import { ListQueryWithOrderDto } from 'types/global/dto/list-query-with-order.dto';

@ApiBearerAuth()
@ApiTags('phone-type')
@Controller('phone-type')
export class PhoneTypeController {
  constructor(private readonly categoryService: PhoneTypeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Req() request: Request,
    @Query() query: ListQueryWithOrderDto
  ): Promise<PhoneTypeInterfaces.Response[]> {
    return await this.categoryService.getAll({
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
  ): Promise<PhoneTypeInterfaces.Response> {
    return this.categoryService.getById({
      id,
      ...query,
      logData: request['userData'],
    });
  }

  @Post()
  @ApiBody({ type: PhoneTypeCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: PhoneTypeCreateDto,
    @Req() request: Request
  ): Promise<PhoneTypeInterfaces.Response> {
    return this.categoryService.create({
      ...data,
      staffNumber: request['userData'].user.numericId,
      logData: request['userData'],
    });
  }

  @Put(':id')
  @ApiBody({ type: PhoneTypeUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<PhoneTypeUpdateDto, 'id'>
  ): Promise<PhoneTypeInterfaces.Response> {
    return this.categoryService.update({
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
  ): Promise<PhoneTypeInterfaces.Response> {
    return this.categoryService.delete({
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
  ): Promise<PhoneTypeInterfaces.Response> {
    return this.categoryService.restore({ id, logData: request['userData'] });
  }
}
