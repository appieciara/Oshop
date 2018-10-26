import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) { }

  // for allowing access to certain routes to only the Admin users
  canActivate():Observable<boolean> {
    return this.auth.appUser$
          .pipe(
                map((appUser) => appUser.isAdmin)
          );   
  }
}
