import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  appConfig,
  JwtConfig,
  servicesRmqConfig,
} from './common/config/app.config';
import { serviceConfig } from 'types/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RpcExceptionInterceptor } from './common/interceptors/rpc.exception.interceptor';
import { CategoryModule } from './modules/organization/category/category.module';
import { SubCategoryModule } from './modules/organization/sub-category/sub-category.module';
import { SegmentModule } from './modules/organization/segment/segment.module';
import { MainOrganizationModule } from './modules/organization/main-organization/main-organization.module';
import { ProductServiceCategoryModule } from './modules/organization/product-servise-category/product-servise-category.module';
import { ProductServiseSubCategoryModule } from './modules/organization/product-servise-sub-category/sub-category.module';
import { AuthGuard } from './common/guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user/user.module';
import { AllExceptionsFilter } from './common/filter/exception.filter';
import { RoleModule } from './modules/user/role/role.module';
import { NearbyCategoryModule } from './modules/organization/nearby-categoty/nearby-category.module';
import { NearbyModule } from './modules/organization/nearby/nearby.module';
import { DistrictModule } from './modules/organization/district/district.module';
import { PassageModule } from './modules/organization/passage/passage.module';
import { RegionModule } from './modules/organization/region/region.module';
import { CityModule } from './modules/organization/city/city.module';
import { AreaModule } from './modules/organization/area/area.module';
import { AvenueModule } from './modules/organization/avenue/avenue.module';
import { ResidentialAreaModule } from './modules/organization/residential-area/residential-area.module';
import { ImpasseModule } from './modules/organization/impasse/impasse.module';
import { VillageModule } from './modules/organization/village/village.module';
import { LaneModule } from './modules/organization/lane/lane.module';
import { StreetModule } from './modules/organization/street/street.module';
import { OrganizationModule } from './modules/organization/organization/organization.module';
import { GoogleCloudStorageModule } from './modules/file-upload/google-cloud-storage.module';
import { PhoneTypeModule } from './modules/organization/phone-type/phone-type.module';
import { FtpModule } from './modules/organization/ftp/ftp.module';
import { AdditionalCategoryModule } from './modules/organization/additional-category/additional-category.module';
import { AdditionalModule } from './modules/organization/additional/additional.module';
import { AdditionalContentModule } from './modules/organization/additional-content/additional-content.module';
import { AdditionalTableModule } from './modules/organization/additional-table/additional-table.module';
import { OrganizationMonitoringModule } from './modules/organization/monitoring/monitoring.module';
import { UserMonitoringModule } from './modules/user/monitoring/monitoring.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [appConfig, serviceConfig, servicesRmqConfig],
      envFilePath: ['.env', '.env.local'],
    }),
    JwtModule.register({
      secret: JwtConfig.secretKey,
    }),
    CategoryModule,
    SubCategoryModule,
    SegmentModule,
    MainOrganizationModule,
    ProductServiceCategoryModule,
    ProductServiseSubCategoryModule,
    RegionModule,
    CityModule,
    DistrictModule,
    NearbyCategoryModule,
    NearbyModule,
    UserModule,
    RoleModule,
    PassageModule,
    AreaModule,
    AvenueModule,
    ResidentialAreaModule,
    ImpasseModule,
    VillageModule,
    LaneModule,
    StreetModule,
    OrganizationModule,
    GoogleCloudStorageModule,
    PhoneTypeModule,
    FtpModule,
    AdditionalCategoryModule,
    AdditionalModule,
    AdditionalContentModule,
    AdditionalTableModule,
    OrganizationMonitoringModule,
    UserMonitoringModule,
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
