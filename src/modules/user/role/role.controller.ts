import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListQueryDto } from 'types/global';
import { RoleInterfaces } from 'types/user/role';
import { RoleService } from './role.service';

@ApiBearerAuth()
@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListOfRoles(
    @Query() query: ListQueryDto
  ): Promise<RoleInterfaces.Response[]> {
    return await this.roleService.getListOfCategory(query);
  }

  // @Get(':id')
  // @ApiParam({ name: 'id' })
  // @HttpCode(HttpStatus.OK)
  // async getById(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Query() query: LanguageRequestDto
  // ): Promise<UserInterfaces.Response> {
  //   return this.userService.getById({ id, ...query });
  // }

  // @Post()
  // @ApiBody({ type: UserCreateDto })
  // @HttpCode(HttpStatus.CREATED)
  // async create(
  //   @Body() data: UserCreateDto
  // ): Promise<UserInterfaces.Response> {
  //   return this.userService.create(data);
  // }

  // @Put(':id')
  // @ApiBody({ type: UserUpdateDto })
  // @HttpCode(HttpStatus.OK)
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() data: Omit<UserUpdateDto, 'id'>
  // ): Promise<UserInterfaces.Response> {
  //   return this.userService.update({ ...data, id });
  // }

  // @Delete(':id')
  // @HttpCode(HttpStatus.OK)
  // async delete(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Query('delete', ParseBoolPipe) deleteQuery?: boolean
  // ): Promise<UserInterfaces.Response> {
  //   return this.userService.delete({ id, delete: deleteQuery });
  // }

  // @Put(':id/restore')
  // @HttpCode(HttpStatus.OK)
  // async restore(
  //   @Param('id', ParseIntPipe) id: number
  // ): Promise<UserInterfaces.Response> {
  //   return this.userService.restore({ id });
  // }
}
