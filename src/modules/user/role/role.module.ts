import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { initRmqClient, USER } from 'types/config';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [ClientsModule.registerAsync([initRmqClient(USER)])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule { }
