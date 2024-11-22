import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { USER } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto, UserPermissions } from 'types/global';
import { UserServiceCommands as Commands, UserCreateDto, UserUpdateDto } from 'types/user/user';
import { UserInterfaces } from 'types/user/user';
import { CheckUserPermissionDto } from 'types/user/user/dto/check-permission.dto';
import { UserLogInDto } from 'types/user/user/dto/log-in-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER) private adminClient: ClientProxy,
    private readonly jwtService: JwtService
  ) { }

  async logIn(data: UserLogInDto): Promise<UserInterfaces.LogInResponse> {
    const user = await lastValueFrom(
      this.adminClient.send<
        UserInterfaces.Response,
        UserInterfaces.LogInRequest
      >({ cmd: Commands.LOG_IN }, data)
    );

    const accessToken = this.jwtService.sign({
      userId: user.id,
      roleId: user.roleId,
    });

    return { accessToken, permissions: UserPermissions['admin'] };
  }

  async checkPermission(data: CheckUserPermissionDto): Promise<boolean> {
    return await lastValueFrom(
      this.adminClient.send<boolean, UserInterfaces.CheckUserPermissionRequest>(
        { cmd: Commands.CHECK_PERMISSION },
        data
      )
    );
  }

  async getListOfUsers(
    query: ListQueryDto
  ): Promise<UserInterfaces.Response[]> {
    if (query.all) {
      return lastValueFrom(
        this.adminClient.send<UserInterfaces.Response[], ListQueryDto>(
          { cmd: Commands.GET_ALL_LIST },
          query
        )
      );
    }

    return lastValueFrom(
      this.adminClient.send<UserInterfaces.Response[], ListQueryDto>(
        { cmd: Commands.GET_LIST_BY_PAGINATION },
        query
      )
    );
  }

  async getById(data: GetOneDto): Promise<UserInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<UserInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
  }

  async create(data: UserCreateDto): Promise<UserInterfaces.Response> {
    return await lastValueFrom(
      this.adminClient.send<
        UserInterfaces.Response,
        UserInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
  }

  async update(data: UserUpdateDto): Promise<UserInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<
        UserInterfaces.Response,
        UserInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
  }

  async delete(data: DeleteDto): Promise<UserInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<UserInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
  }

  async restore(data: GetOneDto): Promise<UserInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<UserInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
  }
}
