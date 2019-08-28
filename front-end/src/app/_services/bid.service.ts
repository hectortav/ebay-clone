import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bid } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BidService {
    constructor(private http: HttpClient) { }

    getById(id: string) {
        return this.http.get<Bid>(`${environment.apiUrl}/bids/${id}`);
    }

    newBid(bid: Bid) {
        return this.http.post(`${environment.apiUrl}/bids`, bid);
    }
}