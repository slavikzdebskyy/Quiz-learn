import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { StorageService } from './storage.service';



@Injectable()
export class AuthLoginService implements CanActivate {

  constructor (private router: Router, private storageService: StorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const tokenDB = this.storageService.getItem(false);
    const tokenSocial = this.storageService.getItem(true);
    if (tokenDB || tokenSocial) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
