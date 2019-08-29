import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Role } from './_models';

import * as jwt_decode from "jwt-decode";

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    get isAdmin() {
        let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
        let tokenInfo = jwt_decode(currentUserJSON.token);
        const tokenRole = tokenInfo.role;
        return this.currentUser && tokenRole === Role.admin;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/']);
    }
}