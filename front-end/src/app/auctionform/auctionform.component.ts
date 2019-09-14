import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuctionService, AuctionsService } from '../_services';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-auctionform',
  templateUrl: './auctionform.component.html',
  styleUrls: ['./auctionform.component.css']
})
export class AuctionformComponent implements OnInit {
  userId: any;
  auctionForm: FormGroup;
  loading = false;
  submitted = false;
  public lat: any;
  public lng: any;
  categories: string[];
  images = [];

  constructor(
    private formBuilder: FormBuilder,
    private auctionService: AuctionService,
    private alertService: AlertService,
    private auctionsService: AuctionsService
  ) { }

  ngOnInit() {
    this.getLocation();

    this.loadAllCategories();

    let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
    let tokenInfo = jwt_decode(currentUserJSON.token);
    this.userId = tokenInfo.userId;

    this.auctionForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: [[], Validators.required],
      location: ['', Validators.required],
      country: ['', Validators.required],
      currently: [''],
      first_bid: ['', Validators.required],
      ends: ['', Validators.required],
      description: ['', Validators.required],
      seller: [this.userId],
      latitude: [-1],
      longitude: [-1],
      images: [[]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.auctionForm.controls; }

  formSubmit() {
    if ((this.lng == undefined) || (this.lat == undefined)) {
      alert("Your exact location will not be shown");
    } else {
      this.auctionForm.value.longitude = this.lng;
      this.auctionForm.value.latitude = this.lat;
    }

    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.auctionForm.invalid) {
      return;
    }

    this.auctionForm.value.currently = this.auctionForm.value.first_bid;

    console.log(this.auctionForm.value)

    this.loading = true;
    this.auctionService.newForm(this.auctionForm.value)
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

  addImages(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.auctionForm.value.images.push('data:image/png;base64,' + btoa(e.target.result));
    this.images.push('data:image/png;base64,' + btoa(e.target.result));
  }

  getLocation() {
    // When on pc it returns a position based on the ISP, not exact GPS data :(
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  private loadAllCategories() {
    this.auctionsService.getCategories().pipe(first()).subscribe(res => {
      let newObj: any = res;
      this.categories = newObj.categories;
    });
  }

}
