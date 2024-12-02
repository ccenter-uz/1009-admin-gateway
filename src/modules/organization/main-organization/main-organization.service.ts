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
  constructor(
    @Inject(ORGANIZATION) private adminClient: ClientProxy,
    private readonly userService: UserService
  ) {}

  async getListOfCategory(
    query: ListQueryDto
  ): Promise<MainOrganizationInterfaces.Response[]> {
    if (query.all) {
      return lastValueFrom(
        this.adminClient.send<
          MainOrganizationInterfaces.Response[],
          ListQueryDto
        >({ cmd: Commands.GET_ALL_LIST }, query)
      );
    }

    return lastValueFrom(
      this.adminClient.send<
        MainOrganizationInterfaces.Response[],
        ListQueryDto
      >({ cmd: Commands.GET_LIST_BY_PAGINATION }, query)
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
    userId: number
  ): Promise<MainOrganizationInterfaces.Response> {
    console.log(userId);
    const user = await this.userService.getById({ id: userId });

    data = { staffNumber: user.numericId, ...data };

    console.log(data, 'DATA');

    const response = await lastValueFrom(
      this.adminClient.send<
        MainOrganizationInterfaces.Response,
        MainOrganizationInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
    console.log(response, 'RES');

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
