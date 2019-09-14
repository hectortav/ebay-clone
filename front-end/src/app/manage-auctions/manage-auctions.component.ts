import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuctionService, UserService } from '../_services';
import { Auction } from '../_models';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-manage-auctions',
  templateUrl: './manage-auctions.component.html',
  styleUrls: ['./manage-auctions.component.css']
})
export class ManageAuctionsComponent implements OnInit {
  openform: boolean;
  myAuctions: Auction[];
  recentAuctions: Auction[];
  selectedAuction: Auction;
  loading = false;

  constructor(
    private auctionService: AuctionService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.openform = false;

    this.loadAllAuctions();

    this.loadRecent();
  }

  // Toggles the new auction form on click
  onClickToggleForm() {
    this.openform = !this.openform;
    return this.openform;
  }

  private loadAllAuctions() {
    this.loading = true;
    this.auctionService.getAll().pipe(first()).subscribe(res => {
      this.loading = false;
      let newObj: any = res;
      this.myAuctions = newObj.auctions;
    });
  }

  onSelect(auction: Auction): void {
    this.selectedAuction = auction;
  }

  calculateClasses(auction: Auction) {
    // Calculating the color of the list item based on the date
    let corrEnds = new Date(auction.ends);
    let currDate = new Date();
    let state: boolean;
    if (auction.started != null) {
      let corrStarted = new Date(auction.started);
      if ((currDate > corrStarted) && (currDate < corrEnds)) {
        state = true;
      }
    }

    if (currDate > corrEnds) {
      state = false;
    }

    return {
      'list-group-item-success': state === true,
      'list-group-item-danger': state === false
    }
  }

  loadRecent() {
    let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
    let tokenInfo = jwt_decode(currentUserJSON.token);

    this.loading = true;
    this.userService.getRecentAuctions(tokenInfo.userId).pipe(first()).subscribe(res => {
      this.loading = false;
      this.recentAuctions = res.seen;
    });
  }
}
