import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, ORGANIZATION } from 'types/config';
import { MainOrganizationController } from './main-organization.controller';
import { MainOrganizationService } from './main-organization.service';
import { UserModule } from 'src/modules/user/user/user.module';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(ORGANIZATION)])],
  controllers: [MainOrganizationController],
  providers: [MainOrganizationService],
})
export class MainOrganizationModule {}
