import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, USER } from 'types/config';
import { MonitoringController } from './monitoring.controller';
import { MonitoringService } from './monitoring.service';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(USER)])],
  controllers: [MonitoringController],
  providers: [MonitoringService],
})
export class UserMonitoringModule {}
