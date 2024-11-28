import { Module } from '@nestjs/common';
import { StreetService } from './street.service';
import { StreetController } from './street.controller';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [StreetController],
  providers: [StreetService],
  exports: [StreetService]
})
export class StreetModule { }
