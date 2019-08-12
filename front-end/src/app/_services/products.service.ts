import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductsService {
    constructor(private http: HttpClient) { }

    getAllProducts() {
        return this.http.get<Products[]>(`${environment.apiUrl}/products`);
    }
}