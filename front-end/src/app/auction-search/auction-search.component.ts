import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Auction } from '../_models';
import { AuctionsService } from '../_services';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-auction-search',
  templateUrl: './auction-search.component.html',
  styleUrls: ['./auction-search.component.css']
})
export class AuctionSearchComponent implements OnInit {
  auctions$: Observable<Auction[]>;
  private searchTerms = new Subject<string>();

  today = new Date();
  jstoday = '';

  constructor(private auctionsService: AuctionsService) {
    this.jstoday = formatDate(this.today, 'MM/dd/yyyy hh:mm:ss a', 'en-US', '+0530');
    console.log(this.jstoday);
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.auctions$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.auctionsService.searchAuctions(term)),
    );
  }

}
