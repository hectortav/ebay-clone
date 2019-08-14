import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User, Products, Auction } from '../_models';
import { UserService } from '../_services';
import { ProductsService } from '../_services';
import { AuctionsService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    // loading = false;
    // users: User[];
    // products: Products[];
    auctions: Auction[];

    config: any;
    count: any;

    constructor(private userService: UserService, private productsService: ProductsService, private auctionsService: AuctionsService) {
        // this.loadAllProducts();
        this.loadAllAuctions();

        this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.count
        };
    }

    ngOnInit() {
        // this.loading = true;
        // this.userService.getAll().pipe(first()).subscribe(res => {
        //     let newObj: any = res;
        //     this.loading = false;
        //     this.users = newObj.users;
        // });

        // this.loading = true;
        // this.productsService.getAllProducts().pipe(first()).subscribe(res => {
        //     let newObj: any = res;
        //     this.loading = false;
        //     this.products = newObj.products;
        // });
    }

    // private loadAllProducts() {
    //     this.loading = true;
    //     this.productsService.getAllProducts().pipe(first()).subscribe(res => {
    //         let newObj: any = res;
    //         this.loading = false;
    //         this.products = newObj.products;
    //         this.count = newObj.count;
    //     });
    // }

    private loadAllAuctions() {
        this.auctionsService.getAllAuctions().pipe(first()).subscribe(res => {
            let newObj: any = res;
            this.auctions = newObj.auctions;
            this.count = newObj.count;
        });
    }

    // Pagination credits: https://www.freakyjolly.com/angular-7-6-pagination-implement-local-or-server-pagination-in-3-steps/
    pageChanged(event) {
        this.config.currentPage = event;
    }
}