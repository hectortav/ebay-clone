import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auction } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuctionsService {
    constructor(private http: HttpClient) { }

    getAllAuctions() {
        return this.http.get<Auction[]>(`${environment.apiUrl}/auctions`);
    }

    getAuction(id) {
        return this.http.get<Auction>(`${environment.apiUrl}/auctions/${id}`);
    }
}