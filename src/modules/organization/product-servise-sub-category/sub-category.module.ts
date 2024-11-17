import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';
import { ProductServiseSubCategoryController } from './sub-category.controller';
import { ProductServiseSubCategoryService } from './sub-category.service';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [ProductServiseSubCategoryController],
  providers: [ProductServiseSubCategoryService],
})
export class ProductServiseSubCategoryModule {}
