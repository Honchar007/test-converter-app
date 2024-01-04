import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getExchangeRatesUAH(): Observable<any> {
    return this.http.get('https://open.er-api.com/v6/latest/UAH');
  }

  getCurrencyRates(currency: string = 'USD'): Observable<any> {
    return this.http.get(`https://open.er-api.com/v6/latest/${currency}`);
  }
}
