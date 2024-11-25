import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';
import { NearbyCategoryController } from './nearby-category.controller';
import { NearbyCategoryService } from './nearby-category.service';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [NearbyCategoryController],
  providers: [NearbyCategoryService],
})
export class NearbyCategoryModule {}
