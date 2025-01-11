import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { FtpServiceCommands as Commands } from 'types/organization/ftp';
import { scriptResponse } from 'types/organization/organization/dto/create-exel.dto';

@Injectable()
export class FtpService {
  private readonly logger = new Logger(FtpService.name);

  constructor(
    @Inject(ORGANIZATION) private readonly adminClient: ClientProxy
  ) {}
  async readExcel(rows: scriptResponse): Promise<any> {
    // console.log(1212);
    // // this.logger.debug(`Sending READ_FILES command with paths:
    // console.log(rows);
    // console.log('serviceRows:', rows);

// console.log(rows);

    const response = await lastValueFrom(
      this.adminClient.send({ cmd: Commands.POST_ORGANIZATIONS }, { rows })
    );

    // this.logger.debug(`Received response: `, response);
    return response;
  }
}
