import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './components/products/products.component';



const routes: Routes = [{
  path:'',
  component:LayoutPageComponent,
  children: [
    {
      path:'home',
      component: ListPageComponent
    },
    {
      path:'shoppingCart',
      component: ShoppingCartComponent

    },
    {
      path:'products',
      component: ProductsComponent

    },
    
    
    {
      path:'**',
      redirectTo: 'home'
    }

  ]

},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoffeeRoutingModule { }
