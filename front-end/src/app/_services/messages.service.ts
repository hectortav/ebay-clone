import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../_models';
import { environment } from 'src/environments/environment';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  getSent() {
    let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
    let tokenInfo = jwt_decode(currentUserJSON.token);
    let id = tokenInfo.userId;

    return this.http.get<Message[]>(`${environment.apiUrl}/messages/${id}/sent`);
  }

  getReceived() {
    let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
    let tokenInfo = jwt_decode(currentUserJSON.token);
    let id = tokenInfo.userId;

    return this.http.get<Message[]>(`${environment.apiUrl}/messages/${id}/received`);
  }

  newMessage(message: Message) {
    return this.http.post(`${environment.apiUrl}/messages`, message);
  }

  updateMessage(message: Message) {
    return this.http.put(`${environment.apiUrl}/messages/${message._id}`, message);
  }

  deleteMessage(message: Message) {
    return this.http.delete(`${environment.apiUrl}/messages/${message._id}`);
  }

  getUnread() {
    let currentUserJSON = JSON.parse(localStorage.getItem('currentUser'));
    let tokenInfo = jwt_decode(currentUserJSON.token);
    let id = tokenInfo.userId;

    return this.http.get<any>(`${environment.apiUrl}/messages/${id}/received/unread`);
  }
}
