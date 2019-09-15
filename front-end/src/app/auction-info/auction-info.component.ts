import { Component, Input, OnChanges } from '@angular/core';
import { Auction, Bid } from '../_models';
import { AuctionService, BidService, AuctionsService } from '../_services';
import { AlertService } from '../_alert';
import { first } from 'rxjs/operators';
import { MessagesService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-auction-info',
  templateUrl: './auction-info.component.html',
  styleUrls: ['./auction-info.component.css']
})
export class AuctionInfoComponent implements OnChanges {
  @Input() auction: Auction;
  bidsArray: Bid[];
  loading = false;
  categories: string[];
  messageForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private auctionService: AuctionService,
    private alertService: AlertService,
    private bidService: BidService,
    private auctionsService: AuctionsService,
    private messagesService: MessagesService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnChanges() {
    if (this.auction.no_bids != 0) {
      this.loadAllBids();
    }

    this.loadAllCategories();

    this.messageForm = this.formBuilder.group({
      text: ['', Validators.required],
      subject: [''],
      sender: [''],
      receiver: [''],
      time: []
    });
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
    this.loading = true;
    this.bidService.getAllBids(this.auction._id).pipe(first()).subscribe(res => {
      this.loading = false;
      let newObj: any = res;
      this.bidsArray = newObj.bids;
    });
  }

  private loadAllCategories() {
    this.auctionsService.getCategories().pipe(first()).subscribe(res => {
      let newObj: any = res;
      this.categories = newObj.categories;
    });
  }

  enableMessaging(auction: Auction): boolean {
    let state: boolean = false;
    let now = new Date();
    let ends = new Date(auction.ends);

    if (now > ends && auction.no_bids != 0) {
      state = true;
    }

    return state;
  }

  // convenience getter for easy access to form fields
  get f() { return this.messageForm.controls; }

  sendMessage() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.messageForm.invalid) {
      return;
    }

    this.messageForm.value.subject = "Congratulations, you won the auction: " + this.auction.name;

    let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
    let tokenInfo = jwt_decode(currentUserJSON.token);
    this.messageForm.value.sender = tokenInfo.userId;
    this.messageForm.value.receiver = this.bidsArray[0].bidder;
    this.messageForm.value.time = new Date();

    this.loading = true;
    this.messagesService.newMessage(this.messageForm.value)
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

  public onChange(event) {
    this.auction.currently = event.target.value;
  }

  addImages(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.auction.images.push(btoa(e.target.result));
  }

}
