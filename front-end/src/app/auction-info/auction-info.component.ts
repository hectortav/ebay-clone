import { Component, OnInit, Input } from '@angular/core';
import { Auction } from '../_models';

@Component({
  selector: 'app-auction-info',
  templateUrl: './auction-info.component.html',
  styleUrls: ['./auction-info.component.css']
})
export class AuctionInfoComponent implements OnInit {
  @Input() auction: Auction;

  constructor() { }

  ngOnInit() {
  }

  delete(auction: Auction): void {
    // this.myAuctions = this.myAuctions.filter(h => h !== auction);
    // this.auctionService.deleteAuction(auction._id).subscribe();
  }

}
