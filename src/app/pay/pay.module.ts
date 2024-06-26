import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayRoutingModule } from './pay-routing.module';
import { SuccessfulPaymentComponent } from './component/successful-payment/successful-payment.component';
import { NavBarComponent } from '../coffee/components/nav-bar/nav-bar.component';
import { CoffeeModule } from '../coffee/coffee.module';


@NgModule({
  declarations: [
    SuccessfulPaymentComponent
  ],
  imports: [
    CommonModule,
    PayRoutingModule,
    CoffeeModule
  ]
})
export class PayModule { }
