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

    constructor(private userService: UserService, private productsService: ProductsService) {
        this.loadAllProducts();
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(res => {
            let newObj: any = res;
            this.loading = false;
            this.users = newObj.users;
        });

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
        });
    }
}