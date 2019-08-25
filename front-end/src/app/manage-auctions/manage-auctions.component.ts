import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuctionService } from '../_services';
import { Auction } from '../_models';

@Component({
  selector: 'app-manage-auctions',
  templateUrl: './manage-auctions.component.html',
  styleUrls: ['./manage-auctions.component.css']
})
export class ManageAuctionsComponent implements OnInit {
  openform: boolean;
  myAuctions: Auction[];
  selectedAuction: Auction;

  constructor(
    private auctionService: AuctionService
  ) { }

  ngOnInit() {
    this.openform = false;

    this.loadAllAuctions();
  }

  // Toggles the new auction form on click
  onClickToggleForm() {
    this.openform = !this.openform;
    return this.openform;
  }

  private loadAllAuctions() {
    this.auctionService.getAll().pipe(first()).subscribe(res => {
      let newObj: any = res;
      this.myAuctions = newObj.auctions;
    });
  }

  onSelect(auction: Auction): void {
    this.selectedAuction = auction;
  }

  calculateClasses(auction: Auction) {
    // Calculating the color of the list item based on the date
    let corrStarted = new Date(auction.started);
    let corrEnds = new Date(auction.ends);
    let currDate = new Date();
    let state: boolean;
    if (auction.started != null) {
      if ((currDate > corrStarted) && (currDate < corrEnds)) {
        state = true;
      }
      if (currDate > corrEnds) {
        state = false;
      }
    }

    return {
      'list-group-item-success': state === true,
      'list-group-item-danger': state === false
    }
  }
}
