import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auction } from '../_models';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuctionsService {
    constructor(private http: HttpClient) { }

    getAllAuctions() {
        return this.http.get<Auction[]>(`${environment.apiUrl}/auctions`);
    }

    getAuction(id) {
        return this.http.get<Auction>(`${environment.apiUrl}/auctions/${id}`);
    }

    searchAuctions(term: string) {
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<Auction[]>(`${environment.apiUrl}/?name=${term}`);
    }
}