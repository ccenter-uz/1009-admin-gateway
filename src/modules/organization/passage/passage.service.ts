import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import { CityRegionFilterDto } from 'types/global/dto/city-region-filter.dto';
import {
  PassageCreateDto,
  PassageUpdateDto,
  PassageInterfaces,
  PassageServiceCommands as Commands,
} from 'types/organization/passage';

@Injectable()
export class PassageService {
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(
    query: CityRegionFilterDto
  ): Promise<PassageInterfaces.Response[]> {
    return lastValueFrom(
      this.adminClient.send<PassageInterfaces.Response[], CityRegionFilterDto>(
        { cmd: Commands.GET_ALL_LIST },
        query
      )
    );
  }

  async getById(data: GetOneDto): Promise<PassageInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<PassageInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
  }

  async create(data: PassageCreateDto): Promise<PassageInterfaces.Response> {
    return await lastValueFrom(
      this.adminClient.send<
        PassageInterfaces.Response,
        PassageInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
  }

  async update(data: PassageUpdateDto): Promise<PassageInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<
        PassageInterfaces.Response,
        PassageInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
  }

  async delete(data: DeleteDto): Promise<PassageInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<PassageInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
  }

  async restore(data: GetOneDto): Promise<PassageInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<PassageInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
  }
}
