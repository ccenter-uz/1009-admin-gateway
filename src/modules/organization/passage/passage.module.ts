import { Module } from '@nestjs/common';
import { PassageService } from './passage.service';
import { PassageController } from './passage.controller';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';

@Module({
  imports:[ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [PassageController],
  providers: [PassageService],
})
export class PassageModule {}
