import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//componenets used in this module
import { ProductCartComponent } from './components/product-cart/product-cart.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';

//services used
import { AuthService } from './services/auth.service'; //for login authentication of user
import { AuthGuard } from './services/auth-guard.service';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { OrderService } from './services/order.service';

//module for routing
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    RouterModule,

    // angular firebase modules
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),

  ],
  declarations: [
    ProductCartComponent,
    ProductQuantityComponent,
    ProductFilterComponent
  ],
  exports: [
    ProductCartComponent,
    ProductQuantityComponent,
    ProductFilterComponent,

    CommonModule,
    FormsModule,
    CustomFormsModule,

    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot().ngModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
