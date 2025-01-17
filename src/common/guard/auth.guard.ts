import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Roles, UserType } from 'types/global';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const path = request.route.path.split('v1')[1];
    const token = request.headers['authorization']?.split(' ')[1];

    if (path === '/user/log-in') return true;

    console.log(request.route.path, 'PATH');

    if (!token) {
      throw new ForbiddenException('No token provided');
    }

    const decoded = this.jwtService.verify(token); /*as {
      roleId: number;
      userId: number;
      exp?: number;
    };*/

    const rolePermissions = await this.userService.checkPermission({
      userId: decoded.userId,
      roleId: decoded.roleId,
      method,
      path,
    });

    if (!rolePermissions) {
      throw new ForbiddenException('Access denied');
    }

    const user = await this.userService.getById({ id: decoded.userId });

    console.log(user.role.name, 'ROLE');
    const userData: UserType = {
      id: user?.id,
      numericId: user?.numericId,
      fullName: user?.fullName,
      role: user.role.name,
    };

    request.body.userData = userData;

    request.userNumericId = user?.numericId;
    request.userId = user?.id;
    request.userFullName = user?.fullName;
    request.userRole = user.role.name;

    return true;
  }
}
