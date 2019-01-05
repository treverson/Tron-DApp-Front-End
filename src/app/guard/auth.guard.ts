import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let obj = JSON.parse(localStorage.getItem('userToken'));
      let validator = false;
      obj ? (validator = true) : this.router.navigate(['/'])
      return true;
  }
  
}
