import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//modules to work iwth firebase
import { AngularFireModule } from 'angularfire2';

// Components used 
import { AppComponent } from './app.component';
import { ProductsComponent } from './shopping/components/products/products.component';

// Module for routing
import { RouterModule } from '@angular/router';


//other modules used 
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [
    AppComponent
 
  ],
  imports: [
    BrowserModule,

    //modules used 
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
   
    // angular firebase modules
    AngularFireModule.initializeApp(environment.firebase),
  
    // routes module
    RouterModule.forRoot([
      { path: '', component: ProductsComponent }

    ])
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
