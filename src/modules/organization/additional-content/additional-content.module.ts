import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';
import { AdditionalContentController } from './additional-content.controller';
import { AdditionalContentService } from './additional-content.service';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [AdditionalContentController],
  providers: [AdditionalContentService],
})
export class AdditionalContentModule {}
