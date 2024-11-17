import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, servicesRmqConfig } from './common/config/app.config';
import { serviceConfig } from 'types/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RcpExceptionInterceptor } from './common/interceptors/rcp.exception.interceptor';
import { CategoryModule } from './modules/organization/category/category.module';
import { SubCategoryModule } from './modules/organization/sub-category/sub-category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [appConfig, serviceConfig, servicesRmqConfig],
      envFilePath: ['.env', '.env.local'],
    }),
    CategoryModule,
    SubCategoryModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RcpExceptionInterceptor,
    },
  ],
})
export class AppModule {}
