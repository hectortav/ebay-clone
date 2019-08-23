import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auction } from '../_models';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class AuctionService {
    constructor(private http: HttpClient) { }

    getAll() {
        let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
        let tokenInfo = jwt_decode(currentUserJSON.token);
        let id = tokenInfo.userId;

        return this.http.get<Auction[]>(`${environment.apiUrl}/auctions/user/${id}`);
    }

    newForm(auction: Auction) {
        return this.http.post(`${environment.apiUrl}/auctions`, auction);
    }

    deleteAuction(id: string) {
        return this.http.delete(`${environment.apiUrl}/auctions/${id}`);
    }

    updateAuction(auction: Auction) {
        return this.http.put(`${environment.apiUrl}/auctions/${auction._id}`, auction);
    }
}