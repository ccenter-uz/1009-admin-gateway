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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LanguageRequestDto, ListQueryDto } from 'types/global';
import {
  OrganizationCreateDto,
  OrganizationInterfaces,
  OrganizationUpdateDto,
} from 'types/organization/organization';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as Multer from 'multer';

import {
  OrganizationVersionInterfaces,
  OrganizationVersionUpdateDto,
} from 'types/organization/organization-version';

import { OrganizationFilterDto } from 'types/organization/organization/dto/filter-organization.dto';
import { ConfirmDto } from 'types/organization/organization/dto/confirm-organization.dto';
import { MyOrganizationFilterDto } from 'types/organization/organization/dto/filter-my-organization.dto';
import { UnconfirmOrganizationFilterDto } from 'types/organization/organization/dto/filter-unconfirm-organization.dto';
import { OrganizationDeleteDto } from 'types/organization/organization/dto/delete-organization.dto';

@ApiBearerAuth()
@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListOrganization(
    @Query() query: OrganizationFilterDto,
    @Req() request: Request
  ): Promise<OrganizationInterfaces.Response[]> {
    return await this.organizationService.getListOrganization(
      query,
      request['userNumericId'],
      request['userRole']
    );
  }

  @Get('my-org')
  @HttpCode(HttpStatus.OK)
  async getMyOrganization(
    @Query() query: MyOrganizationFilterDto,
    @Req() request: Request
  ): Promise<OrganizationInterfaces.Response[]> {
    return await this.organizationService.getMyOrganization(
      query,
      request['userNumericId']
    );
  }

  @Get('unconfirm')
  @HttpCode(HttpStatus.OK)
  async getUnconfirm(
    @Query() query: UnconfirmOrganizationFilterDto,
    @Req() request: Request
  ): Promise<OrganizationInterfaces.Response[]> {
    return await this.organizationService.getUnconfirm(
      query,
      request['userNumericId']
    );
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<OrganizationInterfaces.Response> {
    return this.organizationService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: OrganizationCreateDto })
  @UseInterceptors(FilesInterceptor('photos'))
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: OrganizationCreateDto,
    @Req() request: Request,
    @UploadedFiles() files: Multer.File[]
  ): Promise<OrganizationInterfaces.Response> {
    return this.organizationService.create(
      data,
      request['userRole'],
      request['userNumericId'],
      files
    );
  }

  @Put(':id')
  @ApiBody({ type: OrganizationVersionUpdateDto })
  @UseInterceptors(FilesInterceptor('photos'))
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<OrganizationVersionUpdateDto, 'id'>,
    @Req() request: Request,
    @UploadedFiles() files: Multer.File[]
  ): Promise<OrganizationVersionInterfaces.Response> {
    return this.organizationService.update(
      { ...data, id },
      request['userRole'],
      request['userNumericId'],
      files
    );
  }
  @Put('check/:id')
  @ApiBody({ type: ConfirmDto })
  @HttpCode(HttpStatus.OK)
  async updateCheck(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<ConfirmDto, 'id'>,
    @Req() request: Request
  ): Promise<OrganizationVersionInterfaces.Response> {
    return this.organizationService.updateCheck(
      { ...data, id },
      request['userRole'],
      request['userNumericId']
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Request,
    @Query('delete') deleteQuery?: boolean,
    @Query('deleteReason') deleteReason?: string
  ): Promise<OrganizationInterfaces.Response> {
    return this.organizationService.delete({
      id,
      delete: deleteQuery,
      role: request['userRole'],
      deleteReason: deleteReason,
    });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Request
  ): Promise<OrganizationInterfaces.Response> {
    return this.organizationService.restore({ id, role: request['userRole'] });
  }
}
