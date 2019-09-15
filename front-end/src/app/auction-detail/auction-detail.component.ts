import { Component, OnInit, Input } from '@angular/core';
import { Auction, User } from '../_models';
import { ActivatedRoute } from '@angular/router';
import { AuctionsService, AuthenticationService, BidService, UserService } from '../_services';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../_alert';
import * as jwt_decode from "jwt-decode";

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
  bidForm: FormGroup;
  loading = false;
  submitted = false;
  id: string;
  categories: string[];
  images: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private auctionsService: AuctionsService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private bidService: BidService,
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.getAuction();

    this.bidForm = this.formBuilder.group({
      auction: [],
      bidder: [],
      time: [],
      amount: ['', Validators.required]
    });

    this.seenAuction();
  }

  // convenience getter for easy access to form fields
  get f() { return this.bidForm.controls; }

  getAuction(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.auctionsService.getAuction(this.id).pipe(first()).subscribe(res => {
      let newObj: any = res;
      this.auction = newObj.auction;
      this.categories = this.auction.category;
      if ((this.auction.longitude != -1) && (this.auction.latitude != -1)) {
        this.coords = true
      }
      for (var img in this.auction.images) {
        this.images = true;
        this.auction.images[img] = 'data:image/png;base64,' + this.auction.images[img]
      }

      this.corrEnds = new Date(this.auction.ends);
    });
  }

  formSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.bidForm.invalid) {
      return;
    }

    // Asking the user to confirm the bid
    if (confirm("Are you sure you want to place " + this.bidForm.value.amount + "€ on the auction?")) {
      this.bidForm.value.auction = this.id;
      this.bidForm.value.time = new Date();

      let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
      let tokenInfo = jwt_decode(currentUserJSON.token);
      this.bidForm.value.bidder = tokenInfo.userId

      this.loading = true;
      this.bidService.newBid(this.bidForm.value)
        .pipe(first())
        .subscribe(
          data => {
            window.location.reload();
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
  }

  seenAuction() {
    if (this.currentUser) {
      let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
      let tokenInfo = jwt_decode(currentUserJSON.token);

      this.userService.seenAuction(tokenInfo.userId, this.id)
        .pipe(first())
        .subscribe(
          data => {
            console.log(this.id);
          },
          error => {
            this.alertService.error(error);
          });
    }
  }

}
