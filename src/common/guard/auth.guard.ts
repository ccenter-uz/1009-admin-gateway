import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const path = request.route.path.split('v1')[1];
    const token = request.headers['authorization']?.split(' ')[1];

    if (path === '/user/log-in') return true;

    if (!token) {
      throw new ForbiddenException('No token provided');
    }

    const decoded = this.jwtService.verify(token);

    const rolePermissions = await this.userService.checkPermission({
      userId: decoded.userId,
      roleId: decoded.roleId,
      method,
      path,
    });

    if (!rolePermissions) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
