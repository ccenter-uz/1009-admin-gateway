import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserCreateDto, UserInterfaces, UserUpdateDto } from 'types/user/user';
import { UserLogInDto } from 'types/user/user/dto/log-in-user.dto';
import { UserService } from './user.service';
import { LanguageRequestDto, ListQueryDto } from 'types/global';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('log-in')
  @ApiBody({ type: UserLogInDto })
  @HttpCode(HttpStatus.OK)
  async logIn(
    @Body() data: UserLogInDto
  ): Promise<UserInterfaces.LogInResponse> {
    return this.userService.logIn(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListOfUsers(
    @Query() query: ListQueryDto
  ): Promise<UserInterfaces.Response[]> {
    return await this.userService.getListOfUsers(query);
  }

  @Get('get-me') // /user/get-me
  @HttpCode(HttpStatus.OK)
  async getMeById(@Req() request: Request): Promise<UserInterfaces.Response> {
    return this.userService.getMeById({ id: +request['userId'] });
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  @HttpCode(HttpStatus.OK)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: LanguageRequestDto
  ): Promise<UserInterfaces.Response> {
    return this.userService.getById({ id, ...query });
  }

  @Post()
  @ApiBody({ type: UserCreateDto })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: UserCreateDto): Promise<UserInterfaces.Response> {
    return this.userService.create(data);
  }

  @Put(':id')
  @ApiBody({ type: UserUpdateDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Omit<UserUpdateDto, 'id'>
  ): Promise<UserInterfaces.Response> {
    return this.userService.update({ ...data, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Query('delete') deleteQuery?: boolean
  ): Promise<UserInterfaces.Response> {
    return this.userService.delete({ id, delete: deleteQuery });
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(
    @Param('id', ParseIntPipe) id: number
  ): Promise<UserInterfaces.Response> {
    return this.userService.restore({ id });
  }
}
