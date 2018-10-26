import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, of  } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private userService: UserService , private afAuth: AngularFireAuth, private route: ActivatedRoute) { //ActivatedRoute Contains the information about a route associated with a component loaded in an outlet. An ActivatedRoute can also be used to traverse the router state tree. For more info https://angular.io/api/router/ActivatedRoute
    // this.afAuth.authState.subscribe(user=> this.user = user);
    this.user$ = this.afAuth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'; //after loggedIn variable returnUrl gets the recent Url before loggedIn otherwise home directory url. 
    localStorage.setItem('returnUrl', returnUrl); //sets that returned url locally
    this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());//redirects to google for authentication
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  // returns Users info 
  get appUser$(): Observable<AppUser>{
    return this.user$
           .pipe(
               switchMap((user: firebase.User) => { 
                  if (user) return this.userService.get(user.uid);

                  return of(null);
                }
               )
            );   
  }
}
