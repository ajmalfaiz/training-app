import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(
      private router: Router,
      private  SignserviceServices: AuthserviceService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.SignserviceServices.currentUserValue;
      if (localStorage.getItem('trainin_users')) {
          return true;
      }

      // not logged in so redirect to login page with the return url
      // this.router.navigate(['authentication/signin']);
      // return false;
  }
}
