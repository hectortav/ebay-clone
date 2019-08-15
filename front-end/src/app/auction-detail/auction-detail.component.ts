import { Component, OnInit, Input } from '@angular/core';
import { Auction } from '../_models';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuctionsService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit {
  @Input() auction: Auction;

  constructor(
    private route: ActivatedRoute,
    private auctionsService: AuctionsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getAuction();
  }

  getAuction(): void {
    let id: string;
    this.route.paramMap.subscribe(params => {
      id = params.get('id');
    });
    this.auctionsService.getAuction(id).pipe(first()).subscribe(res => {
      let newObj: any = res;
      this.auction = newObj.auction;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
