import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';
import { NearbyController } from './nearby.controller';
import { NearbyService } from './nearby.service';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [NearbyController],
  providers: [NearbyService],
})
export class NearbyModule {}
