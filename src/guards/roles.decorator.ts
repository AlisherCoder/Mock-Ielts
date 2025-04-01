import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roleskey';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export enum Role {
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN',
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
  CENTER = 'CENTER',
}
