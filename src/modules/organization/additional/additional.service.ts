import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import {
  AdditionalCreateDto,
  AdditionalInterfaces,
  AdditionalUpdateDto,
  AdditionalServiceCommands as Commands,
} from 'types/organization/additional';
import { AdditionalFilterDto } from 'types/organization/additional/dto/filter-additional.dto';

@Injectable()
export class AdditionalService {
  private logger = new Logger(AdditionalService.name);
  constructor(@Inject(ORGANIZATION) private adminClient: ClientProxy) {}

  async getAll(
    query: AdditionalFilterDto
  ): Promise<AdditionalInterfaces.Response[]> {
    const methodName: string = this.getAll.name;

    this.logger.debug(`Method: ${methodName} - Request: `, AdditionalFilterDto);

    const response = lastValueFrom(
      this.adminClient.send<
        AdditionalInterfaces.Response[],
        AdditionalFilterDto
      >({ cmd: Commands.GET_ALL_LIST }, query)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async getById(data: GetOneDto): Promise<AdditionalInterfaces.Response> {
    const methodName: string = this.getById.name;

    const response = lastValueFrom(
      this.adminClient.send<AdditionalInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async create(
    data: AdditionalCreateDto
  ): Promise<AdditionalInterfaces.Response> {
    const methodName: string = this.create.name;

    const response = await lastValueFrom(
      this.adminClient.send<
        AdditionalInterfaces.Response,
        AdditionalInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);

    return response;
  }

  async update(
    data: AdditionalUpdateDto
  ): Promise<AdditionalInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<
        AdditionalInterfaces.Response,
        AdditionalInterfaces.Update
      >({ cmd: Commands.UPDATE }, data)
    );
  }

  async delete(data: DeleteDto): Promise<AdditionalInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<AdditionalInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
  }

  async restore(data: GetOneDto): Promise<AdditionalInterfaces.Response> {
    return lastValueFrom(
      this.adminClient.send<AdditionalInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
  }
}
