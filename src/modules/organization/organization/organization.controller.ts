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

@ApiBearerAuth()
@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListOfCategory(
    @Query() query: ListQueryDto
  ): Promise<OrganizationInterfaces.Response[]> {
    return await this.organizationService.getListOfOrganization(query);
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
  @ApiBody({ type: OrganizationUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<OrganizationUpdateDto, 'id'>
  ): Promise<OrganizationInterfaces.Response> {
    return this.organizationService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<OrganizationInterfaces.Response> {
    return this.organizationService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<OrganizationInterfaces.Response> {
    return this.organizationService.restore({ id });
  }
}
