import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { JwtService } from '../services/jwt-service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private jwtService: JwtService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const allowedRoles = route.data['roles'] as string[];
    const userPayload = this.jwtService.getDecodedAccessToken();
    if (userPayload && userPayload.role) {
      const roles = Array.isArray(userPayload.role)
        ? userPayload.role
        : [userPayload.role];
      if (roles.some((role: string) => allowedRoles.includes(role))) {
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
