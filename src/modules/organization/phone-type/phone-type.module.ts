import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';
import { PhoneTypeController } from './phone-type.controller';
import { PhoneTypeService } from './phone-type.service';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [PhoneTypeController],
  providers: [PhoneTypeService],
})
export class PhoneTypeModule {}
