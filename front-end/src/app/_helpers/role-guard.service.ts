import { AuthenticationService } from '../_services';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {


  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Return is the user is not even logged in
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
      const user = jwt_decode(currentUserJSON.token);

      // Checking using the jwt and the passed data if the user is an admin
      if (user.role === next.data.role) {
        return true;
      }
    }

    // Navigate to not found page
    this.router.navigate(['page-not-found']);
    return false;
  }

}
