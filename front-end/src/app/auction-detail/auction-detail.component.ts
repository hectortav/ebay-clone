import { Component, OnInit, Input } from '@angular/core';
import { Auction, User } from '../_models';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuctionsService, AuthenticationService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-auction-detail',
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css']
})
export class AuctionDetailComponent implements OnInit {
  @Input() auction: Auction;
  coords: boolean = false;
  corrEnds: Date;
  currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private auctionsService: AuctionsService,
    private location: Location,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

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
      if ((this.auction.longitude != -1) && (this.auction.latitude != -1)) {
        this.coords = true
      }

      this.corrEnds = new Date(this.auction.ends);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
