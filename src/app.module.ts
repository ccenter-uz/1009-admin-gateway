import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, servicesRmqConfig } from './common/config/app.config';
import { serviceConfig } from 'types/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RpcExceptionInterceptor } from './common/interceptors/rpc.exception.interceptor';
import { CategoryModule } from './modules/organization/category/category.module';
import { SubCategoryModule } from './modules/organization/sub-category/sub-category.module';
import { SectionModule } from './modules/organization/section/section.module';
import { SegmentModule } from './modules/organization/segment/segment.module';
import { MainOrganizationModule } from './modules/organization/main-organization/main-organization.module';
import { ProductServiceCategoryModule } from './modules/organization/product-servise-category/product-servise-category.module';
import { ProductServiseSubCategoryModule } from './modules/organization/product-servise-sub-category/sub-category.module';
import { AuthGuard } from './common/guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user/user.module';
import { AllExceptionsFilter } from './common/filter/exception.filter';
// import { DistrictModule } from './modules/organization/district/district.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [appConfig, serviceConfig, servicesRmqConfig],
      envFilePath: ['.env', '.env.local'],
    }),
    JwtModule.register({
      secret: 'secret-key', // Replace with your secret key
      signOptions: { expiresIn: '1h' }, // Token expires in 1 hour
    }),
    CategoryModule,
    SubCategoryModule,
    SectionModule,
    SegmentModule,
    MainOrganizationModule,
    ProductServiceCategoryModule,
    ProductServiseSubCategoryModule,
    // DistrictModule,

    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExceptionInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
