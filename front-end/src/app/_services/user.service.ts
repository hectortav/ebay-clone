import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    seenAuction(_id: string, seen: string) {
        return this.http.post(`${environment.apiUrl}/users/seen`, { _id, seen });
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/signup`, user);
    }

    getById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/users/id/${id}`);
    }

    getUnverified() {
        return this.http.get<any>(`${environment.apiUrl}/users/unverified`);
    }

    verifyUser(id: string) {
        return this.http.post(`${environment.apiUrl}/users/verify/${id}`, null);
    }

    unverifyUser(id: string) {
        return this.http.post(`${environment.apiUrl}/users/unverify/${id}`, null);
    }

    deleteUser(user: User | number): Observable<User> {
        const id = typeof user === 'number' ? user : user._id;
        const url = `${environment.apiUrl}/users/${id}`;

        return this.http.delete<User>(url);
    }

    recommendations(id: string) {
        return this.http.post(`${environment.apiUrl}/users/recommendations/${id}`, null);
    }
}