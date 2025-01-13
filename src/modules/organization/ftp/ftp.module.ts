import { Module } from '@nestjs/common';
import { FtpService } from './ftp.service';
import { FtpController } from './ftp.controller';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [FtpController],
  providers: [FtpService],
  exports: [FtpService],
})
export class FtpModule {}
