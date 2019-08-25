import { Component, OnInit, Input } from '@angular/core';
import { Auction } from '../_models';
import { AuctionService } from '../_services';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-auction-info',
  templateUrl: './auction-info.component.html',
  styleUrls: ['./auction-info.component.css']
})
export class AuctionInfoComponent implements OnInit {
  @Input() auction: Auction;

  constructor(
    private auctionService: AuctionService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
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
    let corrStarted = new Date(this.auction.started);
    let currDate = new Date();
    if (corrStarted < currDate) {
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
}
