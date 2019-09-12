import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auction } from '../_models';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuctionsService {
    constructor(private http: HttpClient) { }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            console.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    getAllAuctions() {
        return this.http.get<Auction[]>(`${environment.apiUrl}/auctions`);
    }

    getPageAuctions(page: any) {
        return this.http.get<any>(`${environment.apiUrl}/auctions?page=${page}`);
    }

    getAuction(id) {
        return this.http.get<Auction>(`${environment.apiUrl}/auctions/${id}`);
    }

    getCategories() {
        return this.http.get<string[]>(`${environment.apiUrl}/categories`);
    }

    searchAuctions(term: string) {
        if (!term.trim()) {
            // if not search term, return empty array.
            return of([]);
        }
        return this.http.get<Auction[]>(`${environment.apiUrl}/?name=${term}`).pipe(
            tap(_ => console.log(`found auctions matching "${term}"`)),
            catchError(this.handleError<Auction[]>('searchAuctions', []))
        );
    }

    searchCategory(term: string, page: any) {
        if (!term.trim()) {
            // if not search term, return empty array.
            return of([]);
        }

        return this.http.get<any>(`${environment.apiUrl}/auctions?page=${page}&category=${term}`).pipe(
            tap(_ => console.log(`found auctions matching "${term}"`)),
            catchError(this.handleError<Auction[]>('searchAuctions', []))
        );
    }
}