import { SetMetadata } from '@nestjs/common';
import { roleUser } from '../../domain/IUser';

export const ROLES_KEY = 'roles';
export const RolesDecorator = (...roles: Array<roleUser>[]) => SetMetadata(ROLES_KEY, roles);