import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Auction, User } from '../_models';
import { AuctionsService, AuthenticationService, MessagesService } from '../_services';
import { Subscription, interval } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    auctions: Auction[];
    loading: boolean = false;
    config: any;
    count: any;
    currentUser: User;
    unreadCount: number = 0;
    unread: boolean = false;
    subscription: Subscription;

    constructor(
        private auctionsService: AuctionsService,
        private authenticationService: AuthenticationService,
        private messagesService: MessagesService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.loadAllAuctions();

        this.config = {
            itemsPerPage: 25,
            currentPage: 1,
            totalItems: this.count
        };

        const source = interval(10000);
        this.subscription = source.subscribe(val => this.unreadMessages());
    }

    unreadMessages() {
        if (this.currentUser) {
            this.messagesService.getUnread().pipe(first()).subscribe(res => {
                this.unreadCount = res.unread;
            });

            if (this.unreadCount == 0) {
                this.unread = false;
            }
            else {
                this.unread = true;
            }
        }
    }

    private loadAllAuctions() {
        this.loading = true;
        this.auctionsService.getAllAuctions().pipe(first()).subscribe(res => {
            this.loading = false;
            let newObj: any = res;
            this.auctions = newObj.auctions;
            console.log(this.auctions);
            this.count = newObj.count;
        });
    }

    // Pagination credits: https://www.freakyjolly.com/angular-7-6-pagination-implement-local-or-server-pagination-in-3-steps/
    pageChanged(event) {
        this.config.currentPage = event;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}