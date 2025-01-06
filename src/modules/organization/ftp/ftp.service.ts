import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ORGANIZATION } from 'types/config';
import { FtpServiceCommands as Commands } from 'types/organization/ftp';

@Injectable()
export class FtpService {
  private readonly logger = new Logger(FtpService.name);

  constructor(@Inject(ORGANIZATION) private readonly adminClient: ClientProxy) {}

  async readExcel(remoteFilePath: string, localFilePath: string): Promise<any> {
    this.logger.debug(`Sending READ_FILES command with paths:
      remoteFilePath: ${remoteFilePath},
      localFilePath: ${localFilePath}`);

    const response = await lastValueFrom(
      this.adminClient.send(
        { cmd: Commands.READ_FILES },
        { remoteFilePath, localFilePath }
      )
    );

    this.logger.debug(`Received response: `, response);
    return response;
  }
}
