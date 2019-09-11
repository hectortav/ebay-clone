import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Auction, User } from '../_models';
import { AuctionsService, AuthenticationService, MessagesService } from '../_services';
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
    selectedCategory: any = "Shop by category";
    categories: any[];
    currRouter: string;

    constructor(
        private auctionsService: AuctionsService,
        private authenticationService: AuthenticationService,
        private messagesService: MessagesService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.currRouter = router.url;
    }

    ngOnInit() {
        this.route.queryParams.subscribe(x => this.loadPage(x));
        this.loadAllCategories();

        const source = interval(10000);
        this.subscription = source.subscribe(val => this.unreadMessages());
    }

    private loadPage(params: any) {
        let page = params.page || 1;

        if (params.category) {
            this.loading = true;
            this.auctionsService.searchCategory(params.category, page).pipe(first()).subscribe(newObj => {
                this.loading = false;
                this.auctions = newObj.auctions;
                this.count = newObj.count;
                this.pageN = newObj.pageN;
            });

            return;
        }

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

    searchByCategory() {
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: { 'page': '1', 'category': this.selectedCategory.name },
                replaceUrl: true
            });
    }

    nextPage() {
        let nextP = this.pageN + 1;
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: { page: nextP },
                replaceUrl: true,
                queryParamsHandling: 'merge'
            });
    }

    previousPage() {
        let previousP = this.pageN - 1;
        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: { page: previousP },
                replaceUrl: true,
                queryParamsHandling: 'merge'
            });
    }

    private loadAllCategories() {
        this.auctionsService.getCategories().pipe(first()).subscribe(res => {
            let newObj: any = res;
            this.categories = newObj.categories;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}