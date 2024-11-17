import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { USER } from 'types/config';
import { UserServiceCommands as Commands } from 'types/user/user';
import { UserInterfaces } from 'types/user/user';
import { UserLogInDto } from 'types/user/user/dto/log-in-user.dto';

@Injectable()
export class UserService {
  constructor(@Inject(USER) private adminClient: ClientProxy) {}

  async logIn(data: UserLogInDto): Promise<UserInterfaces.LogInResponse> {
    return await lastValueFrom(
      this.adminClient.send<
        UserInterfaces.LogInResponse,
        UserInterfaces.LogInRequest
      >({ cmd: Commands.CREATE }, data)
    );
  }
}
