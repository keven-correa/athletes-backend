import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE } from '../decorators/role-protected.decorator';
import { Role } from '../enums/user.roles';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ){
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRole: Role = this.reflector.get(ROLE, context.getHandler());
    if(!validRole) return true;
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if(!user) throw new BadRequestException();
    if(validRole.includes(user.role)){
      return true;
    }
    // console.log({validRole: user.role});
   throw new ForbiddenException(`User ${user.email} need a valid role`);
  }
}
