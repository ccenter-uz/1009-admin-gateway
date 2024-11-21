import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import {
  CityCreateDto,
  CityUpdateDto,
  CityInterfaces,
  CityServiceCommands as Commands,
} from 'types/organization/city';

@Injectable()
export class CityService {
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getListOfCategory(
    query: ListQueryDto
  ): Promise<CityInterfaces.Response[]> {
    if (query.all) {
      return lastValueFrom(
        this.adminClient.send<CityInterfaces.Response[], ListQueryDto>(
          { cmd: Commands.GET_ALL_LIST },
          query
        )
      );
    }

    return lastValueFrom(
      this.adminClient.send<CityInterfaces.Response[], ListQueryDto>(
        { cmd: Commands.GET_LIST_BY_PAGINATION },
        query
      )
    );
  }

  async getById(data: GetOneDto): Promise<CityInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<CityInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
  }

  async create(data: CityCreateDto): Promise<CityInterfaces.Response> {
    return await lastValueFrom(
      this.adminClient.send<CityInterfaces.Response, CityInterfaces.Request>(
        { cmd: Commands.CREATE },
        data
      )
    );
  }

  async update(data: CityUpdateDto): Promise<CityInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<CityInterfaces.Response, CityInterfaces.Update>(
        { cmd: Commands.UPDATE },
        data
      )
    );
  }

  async delete(data: DeleteDto): Promise<CityInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<CityInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
  }

  async restore(data: GetOneDto): Promise<CityInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<CityInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
  }
}