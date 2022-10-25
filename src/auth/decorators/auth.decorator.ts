import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '../enums/user.roles';
import { UserRoleGuard } from '../guards/user-role.guard';
import { RoleProtected } from './role-protected.decorator';

export function Auth(...role: Role[]) {
  return applyDecorators(
    RoleProtected(...role),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
