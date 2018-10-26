import { NgModule } from '@angular/core';

//components used in this module
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

//module for routing
import { RouterModule } from '@angular/router';

//other modules 
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    //other module imported
    SharedModule,

    // routes module
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }

    ])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
