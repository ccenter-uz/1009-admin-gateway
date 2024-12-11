import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/modules/user/user/user.service';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import {
  MainOrganizationInterfaces,
  MainOrganizationServiceCommands as Commands,
  MainOrganizationCreateDto,
  MainOrganizationUpdateDto,
} from 'types/organization/main-organization';

@Injectable()
export class MainOrganizationService {
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(
    query: ListQueryDto
  ): Promise<MainOrganizationInterfaces.Response[]> {
    return lastValueFrom(
      this.adminClient.send<
        MainOrganizationInterfaces.Response[],
        ListQueryDto
      >({ cmd: Commands.GET_ALL_LIST }, query)
    );
  }

  async getById(data: GetOneDto): Promise<MainOrganizationInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<MainOrganizationInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
  }

  async create(
    data: MainOrganizationCreateDto,
    userNumericId: string
  ): Promise<MainOrganizationInterfaces.Response> {
    data = { staffNumber: userNumericId, ...data };

    const response = await lastValueFrom(
      this.adminClient.send<
        MainOrganizationInterfaces.Response,
        MainOrganizationInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );

    return response;
  }

  async update(
    data: MainOrganizationUpdateDto
  ): Promise<MainOrganizationInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<
        MainOrganizationInterfaces.Response,
        MainOrganizationInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
  }

  async delete(data: DeleteDto): Promise<MainOrganizationInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<MainOrganizationInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
  }

  async restore(data: GetOneDto): Promise<MainOrganizationInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<MainOrganizationInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
  }
}
