import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { DeleteDto, GetOneDto, ListQueryDto } from 'types/global';
import {
  OrganizationCreateDto,
  OrganizationInterfaces,
  OrganizationUpdateDto,
  OrganizationServiceCommands as Commands,
} from 'types/organization/organization';
import * as Multer from 'multer';
import { GoogleCloudStorageService } from 'src/modules/file-upload/google-cloud-storage.service';
import {
  OrganizationVersionInterfaces,
  OrganizationVersionUpdateDto,
  OrganizationVersionServiceCommands as CommmandsVersion,
} from 'types/organization/organization-version';
import { OrganizationFilterDto } from 'types/organization/organization/dto/filter-organization.dto';
import { ConfirmDto } from 'types/organization/organization/dto/confirm-organization.dto';

@Injectable()
export class OrganizationService {
  private logger = new Logger(OrganizationService.name);
  constructor(
    @Inject(ORGANIZATION) private adminClient: ClientProxy,
    private readonly googleCloudStorageService: GoogleCloudStorageService
  ) {}

  async getListOfOrganization(
    query: OrganizationFilterDto,
    userNumericId: string
  ): Promise<OrganizationInterfaces.Response[]> {
    const methodName: string = this.getListOfOrganization.name;
    query.staffNumber = userNumericId;
    this.logger.debug(`Method: ${methodName} - Request: `, ListQueryDto);

    const response = lastValueFrom(
      this.adminClient.send<OrganizationInterfaces.Response[], ListQueryDto>(
        { cmd: Commands.GET_ALL_LIST },
        query
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async getMyOfOrganization(
    query: ListQueryDto,
    userNumericId: string
  ): Promise<OrganizationInterfaces.Response[]> {
    const methodName: string = this.getListOfOrganization.name;
    query.staffNumber = userNumericId;
    this.logger.debug(`Method: ${methodName} - Request: `, ListQueryDto);

    const response = lastValueFrom(
      this.adminClient.send<OrganizationInterfaces.Response[], ListQueryDto>(
        { cmd: Commands.GET_MY_LIST },
        query
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async getById(data: GetOneDto): Promise<OrganizationInterfaces.Response> {
    const methodName: string = this.getListOfOrganization.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<OrganizationInterfaces.Response, GetOneDto>(
        { cmd: Commands.GET_BY_ID },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async create(
    data: OrganizationCreateDto,
    role: string,
    userNumericId: string,
    files: Array<Multer.File>
  ): Promise<OrganizationInterfaces.Response> {
    const methodName: string = this.getListOfOrganization.name;

    const fileLinks = await this.googleCloudStorageService.uploadFiles(files);
    data = {
      ...data,
      role,
      staffNumber: userNumericId,
      PhotoLink: fileLinks,
      phone:
        typeof data.phone == 'string' ? JSON.parse(data.phone) : data.phone,
      productService:
        typeof data.productService == 'string'
          ? JSON.parse(data.productService)
          : data.productService,
      nearby:
        typeof data.nearby == 'string' ? JSON.parse(data.nearby) : data.nearby,
    };

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = await lastValueFrom(
      this.adminClient.send<
        OrganizationInterfaces.Response,
        OrganizationInterfaces.Request
      >({ cmd: Commands.CREATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async update(
    data: OrganizationVersionUpdateDto,
    role: string,
    userNumericId: string,
    files: Array<Multer.File>
  ): Promise<OrganizationVersionInterfaces.Response> {
    const methodName: string = this.getListOfOrganization.name;

    const fileLinks = await this.googleCloudStorageService.uploadFiles(files);
    data = {
      ...data,
      role,
      staffNumber: userNumericId,
      PhotoLink: fileLinks,
      phone:
        typeof data.phone == 'string' ? JSON.parse(data.phone) : data.phone,
      productService:
        typeof data.productService == 'string'
          ? JSON.parse(data.productService)
          : data.productService,
      nearby:
        typeof data.nearby == 'string' ? JSON.parse(data.nearby) : data.nearby,
      picture:
        typeof data.picture == 'string'
          ? JSON.parse(data.picture)
          : data.picture,
    };

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<
        OrganizationVersionInterfaces.Response,
        OrganizationVersionInterfaces.Update
      >({ cmd: CommmandsVersion.UPDATE }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async delete(data: DeleteDto): Promise<OrganizationInterfaces.Response> {
    const methodName: string = this.getListOfOrganization.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<OrganizationInterfaces.Response, DeleteDto>(
        { cmd: Commands.DELETE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async updateConfirm(
    data: ConfirmDto,
    role: string,
    userNumericId: string
  ): Promise<OrganizationVersionInterfaces.Response> {
    const methodName: string = this.getListOfOrganization.name;

  data = {
    ...data,
    role,
      staffNumber: userNumericId,
    };

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<
        OrganizationInterfaces.Response,
        OrganizationInterfaces.Update
      >({ cmd: Commands.CONFIRM }, data)
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }

  async restore(data: GetOneDto): Promise<OrganizationInterfaces.Response> {
    const methodName: string = this.getListOfOrganization.name;

    this.logger.debug(`Method: ${methodName} - Request: `, data);

    const response = lastValueFrom(
      this.adminClient.send<OrganizationInterfaces.Response, GetOneDto>(
        { cmd: Commands.RESTORE },
        data
      )
    );
    this.logger.debug(`Method: ${methodName} - Response: `, response);
    return response;
  }
}
