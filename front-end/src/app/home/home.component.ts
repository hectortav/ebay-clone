import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Auction } from '../_models';
import { AuctionsService } from '../_services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    auctions: Auction[];

    config: any;
    count: any;

    constructor(private auctionsService: AuctionsService) { }

    ngOnInit() {
        this.loadAllAuctions();

        this.config = {
            itemsPerPage: 5,
            currentPage: 1,
            totalItems: this.count
        };
    }

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