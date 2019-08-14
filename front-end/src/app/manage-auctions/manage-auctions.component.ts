import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuctionService } from '../_services';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-manage-auctions',
  templateUrl: './manage-auctions.component.html',
  styleUrls: ['./manage-auctions.component.css']
})
export class ManageAuctionsComponent implements OnInit {
  openform: boolean;
  userId: any;
  auctionForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private auctionService: AuctionService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.openform = false;

    let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
    let tokenInfo = jwt_decode(currentUserJSON.token);
    this.userId = tokenInfo.userId;
    console.log(tokenInfo.userId);

    this.auctionForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      country: ['', Validators.required],
      currently: ['', Validators.required],
      started: ['', Validators.required],
      ends: ['', Validators.required],
      description: ['', Validators.required],
      seller: [this.userId]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.auctionForm.controls; }

  formSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.auctionForm.invalid) {
      return;
    }

    this.loading = true;
    this.auctionService.newForm(this.auctionForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(this.auctionForm.value);
          // this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  // Toggles the new auction form on click
  onClickToggleForm() {
    this.openform = !this.openform;
    return this.openform;
  }
}
