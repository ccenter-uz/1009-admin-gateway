import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
