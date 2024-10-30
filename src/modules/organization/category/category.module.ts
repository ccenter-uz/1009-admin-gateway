import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { initTcpService, ORGANIZATION } from 'types/config';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [ClientsModule.registerAsync([initTcpService(ORGANIZATION)])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule { }
