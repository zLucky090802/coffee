import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateFn, canMatchFn } from './auth/guards/auth.guard';
import { canActivatePublic, canMatchFnPublic } from './auth/guards/public.guard';


const routes: Routes = [{
  path:'coffee',
  loadChildren: ()=> import('./coffee/coffee.module').then(m => m.CoffeeModule)
},
{
  path:'auth',
  loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule),
  canMatch:[canMatchFnPublic],
  canActivate:[canActivatePublic]
},
{
  path:'payment',
  loadChildren: ()=> import('./pay/pay.module').then(m=>m.PayModule),
  canMatch:[canMatchFn],
  canActivate:[canActivateFn],
},

{
  path:'**',
  redirectTo:'coffee'
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration:'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0,64]
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
