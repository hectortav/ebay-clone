import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Auction, User } from '../_models';
import { AuctionsService, AuthenticationService, MessagesService } from '../_services';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    auctions: Auction[];
    loading: boolean = false;
    count: any;
    currentUser: User;
    unreadCount: number = 0;
    unread: boolean = false;
    subscription: Subscription;
    pageN: any;

    constructor(
        private auctionsService: AuctionsService,
        private authenticationService: AuthenticationService,
        private messagesService: MessagesService,
        private route: ActivatedRoute
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.route.queryParams.subscribe(x => this.loadPage(x.page || 1));

        const source = interval(10000);
        this.subscription = source.subscribe(val => this.unreadMessages());
    }

    private loadPage(page: any) {
        this.loading = true;
        this.auctionsService.getPageAuctions(page).pipe(first()).subscribe(newObj => {
            this.loading = false;
            this.auctions = newObj.auctions;
            this.count = newObj.count;
            this.pageN = newObj.pageN;
        });
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
            this.count = newObj.count;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}