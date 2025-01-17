import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';
import { AdditionalTableController } from './additional-table.controller';
import { AdditionalTableService } from './additional-table.service';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [AdditionalTableController],
  providers: [AdditionalTableService],
})
export class AdditionalTableModule {}
