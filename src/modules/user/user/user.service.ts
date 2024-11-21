import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { USER } from 'types/config';
import { UserPermissions } from 'types/global';
import { UserServiceCommands as Commands } from 'types/user/user';
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
}
