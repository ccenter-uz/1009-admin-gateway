import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';
import { SegmentController } from './segment.controller';
import { SegmentService } from './segment.service';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [SegmentController],
  providers: [SegmentService],
})
export class SegmentModule {}
