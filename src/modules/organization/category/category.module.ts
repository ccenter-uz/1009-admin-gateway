import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
