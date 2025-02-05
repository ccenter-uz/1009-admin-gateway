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
import { MainOrganizationService } from './main-organization.service';
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
  MainOrganizationCreateDto,
  MainOrganizationInterfaces,
  MainOrganizationUpdateDto,
} from 'types/organization/main-organization';
import { ListQueryWithOrderDto } from 'types/global/dto/list-query-with-order.dto';

@ApiBearerAuth()
@ApiTags('main-organization')
@Controller('main-organization')
export class MainOrganizationController {
  constructor(
    private readonly mainOrganizationService: MainOrganizationService
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Req() request: Request,
    @Query() query: ListQueryWithOrderDto
  ): Promise<MainOrganizationInterfaces.Response[]> {
    return await this.mainOrganizationService.getAll({
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
  ): Promise<MainOrganizationInterfaces.Response> {
    return this.mainOrganizationService.getById({
      id,
      ...query,
      logData: request['userData'],
    });
  }

  @Post()
  @ApiBody({ type: MainOrganizationCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: MainOrganizationCreateDto,
    @Req() request: Request
  ): Promise<MainOrganizationInterfaces.Response> {
    return this.mainOrganizationService.create({
      ...data,
      staffNumber: request['userData'].user.numericId,
      logData: request['userData'],
    });
  }

  @Put(':id')
  @ApiBody({ type: MainOrganizationUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<MainOrganizationUpdateDto, 'id'>
  ): Promise<MainOrganizationInterfaces.Response> {
    return this.mainOrganizationService.update({
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
  ): Promise<MainOrganizationInterfaces.Response> {
    return this.mainOrganizationService.delete({
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
  ): Promise<MainOrganizationInterfaces.Response> {
    return this.mainOrganizationService.restore({
      id,
      logData: request['userData'],
    });
  }
}
