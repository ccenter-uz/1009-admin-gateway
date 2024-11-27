import { Module } from '@nestjs/common';
import { ResidentialAreaService } from './residential-area.service';
import { ResidentialAreaController } from './residential-area.controller';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [ResidentialAreaController],
  providers: [ResidentialAreaService],
  exports: [ResidentialAreaService]
})
export class ResidentialAreaModule { }
