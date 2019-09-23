import { Component, OnInit } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { UserService } from '../_services';
import { Auction } from '../_models';
import { first } from 'rxjs/internal/operators/first';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  auctions: Auction[];

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
    let tokenInfo = jwt_decode(currentUserJSON.token);
    let id = tokenInfo.userId;

    this.userService.recommendations(id)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          var newObj: any = data;
          this.auctions = newObj.recommendations;
        },
        error => {
          this.alertService.error(error);
        });
  }

}
