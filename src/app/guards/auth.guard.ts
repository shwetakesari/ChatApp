
import { Injectable } from '@angular/core';
import { CanActivate, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {map, take, tap} from 'rxjs/operators';
import {Alert} from './../classes/alert';
import {AlertType} from './../enums/alert-type.enum';
import {AlertService} from './../Services/alert-service.service';
import {AuthService} from './../Services/auth-service.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private alert: AlertService,
    private auth: AuthService
  ){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean{
      return this.auth.currentUser.pipe(
        take(1),
        map((currentUser)=>!!currentUser),
        tap((loggedIn)=>{
          if(!loggedIn){
            this.alert.alerts.next(new Alert("You must be logged in to access that page.", AlertType.Danger));
            this.router.navigate(['/login'], {queryParams:{returnUrl : state.url}})
          }
        })
      );
  }
 
}
