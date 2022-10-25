import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/user.roles';

export const ROLE = 'role';

export const RoleProtected = (...args: Role[]) => {
    return SetMetadata(ROLE, args);
}
