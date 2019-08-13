import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { User, Products } from '../_models';
import { UserService } from '../_services';

import { ProductsService } from '../_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[];

    products: Products[];

    config: any;
    count: any;

    constructor(private userService: UserService, private productsService: ProductsService) {
        this.loadAllProducts();

        this.config = {
            itemsPerPage: 1,
            currentPage: 1,
            totalItems: this.count
        };

        console.log(JSON.parse(localStorage.getItem('currentUser')));
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

    private loadAllProducts() {
        this.loading = true;
        this.productsService.getAllProducts().pipe(first()).subscribe(res => {
            let newObj: any = res;
            this.loading = false;
            this.products = newObj.products;
            this.count = newObj.count;
        });
    }

    // Pagination credits: https://www.freakyjolly.com/angular-7-6-pagination-implement-local-or-server-pagination-in-3-steps/
    pageChanged(event) {
        this.config.currentPage = event;
    }
}