import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService, MessagesService } from './_services';
import { User, Role } from './_models';

import * as jwt_decode from "jwt-decode";
import { first } from 'rxjs/internal/operators/first';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentUser: User;
    count: number;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private messagesService: MessagesService
    ) {
        this.unreadMessages();
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    unreadMessages() {
        this.messagesService.getUnread().pipe(first()).subscribe(res => {
            let newObj: any = res;
            this.count = newObj.unread;
        });
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