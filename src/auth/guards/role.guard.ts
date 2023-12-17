/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/role.enum';
import { ROLE_KEY } from '../enum/role.decorator';
import { Observable } from 'rxjs';

@Injectable()
export default class RoleGuard implements CanActivate
{
    constructor (private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>
    {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (requiredRoles) {

            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some(role => user?.role?.includes(role));

    }
}
