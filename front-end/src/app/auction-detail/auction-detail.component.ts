import { Component, OnInit, Input } from '@angular/core';
import { Auction } from '../_models';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit {
  @Input() auction: Auction;

  constructor() { }

  ngOnInit() {
  }
}
