import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Auction, User } from '../_models';
import { AuctionsService, AuthenticationService, MessagesService } from '../_services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    pageN: any;
    selectedCategory: any = "Shop by category";
    categories: any[];
    currRouter: string;
    searchForm: FormGroup;

    constructor(
        private auctionsService: AuctionsService,
        private authenticationService: AuthenticationService,
        private messagesService: MessagesService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.currRouter = router.url;
        this.unreadMessages()
    }

    ngOnInit() {
        this.route.queryParams.subscribe(x => this.loadPage(x));
        this.loadAllCategories();

        this.searchForm = this.formBuilder.group({
            text: [''],
            price: [''],
            location: [''],
            category: ['']
        });
    }

    private loadPage(params: any) {
        let page = params.page || 1;

        if (params.text || params.price || params.location) {
            this.loading = true;
            this.auctionsService.searchAuctions(encodeURIComponent(params.category), params.text, params.price, params.location, page).pipe(first()).subscribe(newObj => {
                this.loading = false;
                this.auctions = newObj.auctions;
                this.count = newObj.count;
                this.pageN = newObj.pageN;
            });

            return;
        }

        if (params.category) {
            this.loading = true;
            this.auctionsService.searchCategory(encodeURIComponent(params.category), page).pipe(first()).subscribe(newObj => {
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

                if (this.unreadCount == 0) {
                    this.unread = false;
                }
                else {
                    this.unread = true;
                }
            });
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

    searchSubmit() {
        // Checking if the query is empty
        if (this.searchForm.value.category == "" && this.searchForm.value.text == "" && this.searchForm.value.price == "" && this.searchForm.value.location == "") {
            return;
        }

        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: { 'page': '1', 'category': this.searchForm.value.category, 'text': this.searchForm.value.text, 'price': this.searchForm.value.price, 'location': this.searchForm.value.location },
                replaceUrl: true
            });
    }
}