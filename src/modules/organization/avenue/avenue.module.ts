import { Module } from '@nestjs/common';
import { AvenueService } from './avenue.service';
import { AvenueController } from './avenue.controller';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [AvenueController],
  providers: [AvenueService],
  exports: [AvenueService]
})
export class AvenueModule { }
