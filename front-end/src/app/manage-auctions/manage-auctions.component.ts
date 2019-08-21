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

  delete(auction: Auction): void {
    this.myAuctions = this.myAuctions.filter(h => h !== auction);
    this.auctionService.deleteAuction(auction._id).subscribe();
  }
}
