import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { USER } from 'types/config';
import {
  DeleteDto,
  GetOneDto,
  ListQueryDto,
  UserPermissions,
} from 'types/global';
import {
  UserServiceCommands as Commands,
  UserCreateDto,
  UserUpdateDto,
} from 'types/user/user';
import { UserInterfaces } from 'types/user/user';
import { CheckUserPermissionDto } from 'types/user/user/dto/check-permission.dto';
import { UserLogInDto } from 'types/user/user/dto/log-in-user.dto';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @Inject(USER) private adminClient: ClientProxy,
    private readonly jwtService: JwtService
  ) {}

  async logIn(data: UserLogInDto): Promise<UserInterfaces.LogInResponse> {
    const methodName: string = this.logIn.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

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

    const response: UserInterfaces.LogInResponse = {
      accessToken,
      permissions: UserPermissions['admin'],
    };

    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async checkPermission(data: CheckUserPermissionDto): Promise<boolean> {
    const methodName: string = this.checkPermission.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response: boolean = await lastValueFrom(
      this.adminClient.send<boolean, UserInterfaces.CheckUserPermissionRequest>(
        { cmd: Commands.CHECK_PERMISSION },
        data
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async getListOfUsers(
    query: ListQueryDto
  ): Promise<UserInterfaces.Response[]> {
    const methodName: string = this.getListOfUsers.name;

    this.logger.debug(`Method: ${methodName} - Request: `, query);

    let response: UserInterfaces.Response[];
    // if (query.all) {
    //   response = await lastValueFrom(
    //     this.adminClient.send<UserInterfaces.Response[], ListQueryDto>(
    //       { cmd: Commands.GET_ALL_LIST },
    //       query
    //     )
    //   );

    //   this.logger.debug(`Method: ${methodName} - Response if all: `, response);

    //   return response;
    // }

    response = await lastValueFrom(
      this.adminClient.send<UserInterfaces.Response[], ListQueryDto>(
        { cmd: Commands.GET_LIST_BY_PAGINATION },
        query
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async getById(data: GetOneDto): Promise<UserInterfaces.Response> {
    const methodName: string = this.getById.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response: UserInterfaces.Response = await lastValueFrom(
      this.adminClient.send<UserInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async create(data: UserCreateDto): Promise<UserInterfaces.Response> {
    const methodName: string = this.create.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response: UserInterfaces.Response = await lastValueFrom(
      this.adminClient.send<UserInterfaces.Response, UserInterfaces.Request>(
        { cmd: Commands.CREATE },
        data
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async update(data: UserUpdateDto): Promise<UserInterfaces.Response> {
    const methodName: string = this.update.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response: UserInterfaces.Response = await lastValueFrom(
      this.adminClient.send<UserInterfaces.Response, UserInterfaces.Update>(
        { cmd: Commands.UPDATE },
        data
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async delete(data: DeleteDto): Promise<UserInterfaces.Response> {
    const methodName: string = this.delete.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response: UserInterfaces.Response = await lastValueFrom(
      this.adminClient.send<UserInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async restore(data: GetOneDto): Promise<UserInterfaces.Response> {
    const methodName: string = this.restore.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response: UserInterfaces.Response = await lastValueFrom(
      this.adminClient.send<UserInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );

    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }
}
