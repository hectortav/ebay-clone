import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auction } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuctionService {
    constructor(private http: HttpClient) { }

    // getAll() {
    //     return this.http.get<User[]>(`${config.apiUrl}/users`);
    // }

    newForm(auction: Auction) {
        return this.http.post(`${environment.apiUrl}/auctions`, auction);
    }

    // delete(id: number) {
    //     return this.http.delete(`${config.apiUrl}/users/${id}`);
    // }
}