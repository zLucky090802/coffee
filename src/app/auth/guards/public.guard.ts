import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import {  AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard {
  constructor() { }

}

const checkStatus= ():Observable<boolean> | boolean=>{
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
  .pipe(
    tap(isAuthenticated => {
      if(isAuthenticated){
        router.navigate(['payment'])
      }
    }),
    map(isAuthenticated => !isAuthenticated)
  )
}

export const canActivatePublic: CanActivateFn =  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean => {

  return checkStatus();
};

export const canMatchFnPublic: CanMatchFn = (route: Route, segments: UrlSegment[]): Observable<boolean> | boolean => {
  
  return checkStatus();
};
