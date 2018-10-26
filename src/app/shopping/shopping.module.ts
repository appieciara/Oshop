import { NgModule } from '@angular/core';

//components used in this module
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';

//services
import { AuthGuard } from 'shared/services/auth-guard.service';  //for protecting the routes from unauthenticated user

//module for routing
import { RouterModule } from '@angular/router';

//other modules imported
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    //other module imported 
    SharedModule,
    
    // routes module
    RouterModule.forChild([

      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component:ShoppingCartComponent  },
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'my/order', component: MyOrdersComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]  }
      
    ])
  ],
  declarations: [
    CheckOutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ShippingFormComponent,
    ShoppingCartComponent,
    ShoppingCartSummaryComponent
    
  ],
  providers: [
   
  ]
})
export class ShoppingModule { }
