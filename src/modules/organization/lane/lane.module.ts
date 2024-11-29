import { Module } from '@nestjs/common';
import { LaneService } from './lane.service';
import { LaneController } from './lane.controller';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [LaneController],
  providers: [LaneService],
  exports: [LaneService]
})
export class LaneModule { }
