import { NgModule } from '@angular/core';

//components used in this module
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

//services 
import { AdminAuthGuard } from './services/admin-auth-guard.service'; //for protecting the routes from unauthenticated user
import { AuthGuard } from 'shared/services/auth-guard.service'; //for checking admin or not 

// modules for routing
import { RouterModule } from '@angular/router';

//other modules imported 
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    //other module imported 
    SharedModule,

    // routes module
    RouterModule.forChild([
      
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard], },
    ])
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
