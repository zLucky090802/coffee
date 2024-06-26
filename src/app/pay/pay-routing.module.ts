import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessfulPaymentComponent } from './component/successful-payment/successful-payment.component';

const routes: Routes = [
  {
    path:'',
    component:SuccessfulPaymentComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayRoutingModule { }
