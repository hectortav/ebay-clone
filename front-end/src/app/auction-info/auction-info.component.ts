import { Component, Input, OnChanges } from '@angular/core';
import { Auction, Bid } from '../_models';
import { AuctionService, BidService } from '../_services';
import { AlertService } from '../_alert';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-auction-info',
  templateUrl: './auction-info.component.html',
  styleUrls: ['./auction-info.component.css']
})
export class AuctionInfoComponent implements OnChanges {
  @Input() auction: Auction;
  bidsArray: Bid[];

  constructor(
    private auctionService: AuctionService,
    private alertService: AlertService,
    private bidService: BidService
  ) { }

  ngOnChanges() {
    if (this.auction.no_bids != 0) {
      this.loadAllBids();
    }
  }

  delete(): void {
    if (this.auction.no_bids != 0) {
      this.alertService.error("You cannot delete an auction after the first bid has been placed");
    }
    else {
      this.auctionService.deleteAuction(this.auction._id).subscribe();
      window.location.reload();
    }
  }

  edit(): void {
    if (this.auction.started != null) {
      this.alertService.error("You cannot edit an auction after it has started");
    }
    else {
      this.auctionService.updateAuction(this.auction).subscribe();
      this.alertService.success("Auction edited");
    }
  }

  start(): void {
    if (this.auction.started != null) {
      this.alertService.error("The auction has already started")
    }
    else {
      this.auction.started = new Date();
      this.auctionService.updateAuction(this.auction).subscribe();
      window.location.reload();
    }
  }

  disableEdit(auction: Auction): boolean {
    let state: boolean = false;
    if (this.auction.started != null) {
      state = true;
    }
    return state;
  }

  private loadAllBids() {
    this.bidService.getAllBids(this.auction._id).pipe(first()).subscribe(res => {
      let newObj: any = res;
      this.bidsArray = newObj.bids;
    });
  }
}
