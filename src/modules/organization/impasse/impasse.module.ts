import { Module } from '@nestjs/common';
import { ImpasseService } from './impasse.service';
import { ImpasseController } from './impasse.controller';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [ImpasseController],
  providers: [ImpasseService],
  exports: [ImpasseService]
})
export class ImpasseModule { }
