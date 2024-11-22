import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { USER } from 'types/config';
import { ListQueryDto } from 'types/global';
import {
  RoleServiceCommands as Commands,
  RoleInterfaces,
} from 'types/user/role';

@Injectable()
export class RoleService {
  private logger = new Logger(RoleService.name);

  constructor(@Inject(USER) private adminClient: ClientProxy) {}
  async getListOfRoles(
    query: ListQueryDto
  ): Promise<RoleInterfaces.Response[]> {
    const methodName: string = this.getListOfRoles.name;

    this.logger.debug(`Method: ${methodName} - Request: `, query);

    let response: RoleInterfaces.Response[];
    if (query.all) {
      response = await lastValueFrom(
        this.adminClient.send<RoleInterfaces.Response[], ListQueryDto>(
          { cmd: Commands.GET_ALL_LIST },
          query
        )
      );

      this.logger.debug(`Method: ${methodName} - Respsonse: `, response);

      return response;
    }

    response = await lastValueFrom(
      this.adminClient.send<RoleInterfaces.Response[], ListQueryDto>(
        { cmd: Commands.GET_LIST_BY_PAGINATION },
        query
      )
    );

    this.logger.debug(`Method: ${methodName} - Respsonse: `, response);

    return response;
  }

  // async getById(data: GetOneDto): Promise<UserInterfaces.Response> {
  //   return lastValueFrom(
  //     this.adminClient.send<UserInterfaces.Response, GetOneDto>(
  //       { cmd: Commands.GET_BY_ID },
  //       data
  //     )
  //   );
  // }

  // async create(data: UserCreateDto): Promise<UserInterfaces.Response> {
  //   return await lastValueFrom(
  //     this.adminClient.send<
  //       UserInterfaces.Response,
  //       UserInterfaces.Request
  //     >({ cmd: Commands.CREATE }, data)
  //   );
  // }

  // async update(data: UserUpdateDto): Promise<UserInterfaces.Response> {
  //   return lastValueFrom(
  //     this.adminClient.send<
  //       UserInterfaces.Response,
  //       UserInterfaces.Update
  //     >({ cmd: Commands.UPDATE }, data)
  //   );
  // }

  // async delete(data: DeleteDto): Promise<UserInterfaces.Response> {
  //   return lastValueFrom(
  //     this.adminClient.send<UserInterfaces.Response, DeleteDto>(
  //       { cmd: Commands.DELETE },
  //       data
  //     )
  //   );
  // }

  // async restore(data: GetOneDto): Promise<UserInterfaces.Response> {
  //   return lastValueFrom(
  //     this.adminClient.send<UserInterfaces.Response, GetOneDto>(
  //       { cmd: Commands.RESTORE },
  //       data
  //     )
  //   );
  // }
}
