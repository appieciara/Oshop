import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }

  // for disabling certain routes being access except loggedIn User 
  canActivate(route, state: RouterStateSnapshot){ //RouterStateSnapShot represents the state of the router at a moment in time. for more info https://angular.io/api/router/RouterStateSnapshot
    // return this.auth.user$.subscribe(user => {  
    //   if(user)  return true; 

    //   this.router.navigate(['/login']);
    //     return false;
    // });
    return this.auth.user$.pipe(map(user => { //we use map here because CanActivate Interface returns boolean but here we are subscribing and returnig true/false only when this function is called at somewhere so to return Observable boolean we convert user Object to Observable boolean by using map. 
          if(user)  return true; 

          this.router.navigate(['/login'], {queryParams:{returnUrl: state.url} }); //querParams is for optional parameter.
            return false;
        }));
  }
  
}
