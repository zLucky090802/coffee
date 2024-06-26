import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard {
  constructor() { }

}

const checkAuthStatus= ():boolean | Observable<boolean> =>{
 const authService = inject(AuthService);
 const route = inject(Router);

 return authService.checkAuthentication()
  .pipe(
    tap( isAuthenticated =>{
      if(!isAuthenticated) route.navigate(['./auth/login'])
    })
  )
}

export const canMatchFn = (route: Route, segments: UrlSegment[]):boolean | Observable<boolean>=>{
return checkAuthStatus();
}

export const canActivateFn = (route: ActivatedRouteSnapshot, segments: RouterStateSnapshot):boolean | Observable<boolean>=>{
 return checkAuthStatus()
}
