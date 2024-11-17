import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';
import { ProductServiceCategoryController } from './product-servise-category.controller';
import { ProductServiceCategoryService } from './product-servise-category.service';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [ProductServiceCategoryController],
  providers: [ProductServiceCategoryService],
})
export class ProductServiceCategoryModule {}
