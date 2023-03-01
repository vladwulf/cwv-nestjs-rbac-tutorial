import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums';

/**
 * @deprecated Roles guard is a simplistic RBAC approach where we just check whether the user has certain roles
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const { session } = context.switchToHttp().getRequest<Request>();

    return requiredRoles.some((role) => session.user.roles.includes(role));
  }
}
