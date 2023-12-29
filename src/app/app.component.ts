import { HttpClient } from '@angular/common/http';
import { Component, SimpleChanges } from '@angular/core';
import dateConverter from '../helpers/DateConverter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-converter-app';

  selectedCurrencyFrom: string = 'USD'; // default values
  selectedCurrencyTo: string = 'UAH';
  rate: number = 1;
  amountFrom: number = 0;
  amountTo: number = 0;
  from: boolean = true;
  eurDol: any = [];
  currencies: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`https://open.er-api.com/v6/latest/UAH`)
    .subscribe((response: any) => {
      this.eurDol = {
        time: dateConverter(response.time_last_update_unix),
        exchange: [
          {
            name: 'USD',
            rate: (1/response.rates['USD']).toFixed(2),
          },
          {
            name: 'EUR',
            rate: (1/response.rates['EUR']).toFixed(2),
          }
        ]
      };
    });

    this.http.get(`https://open.er-api.com/v6/latest`)
    .subscribe((response: any) => {
      if(response && response.rates) {
        this.currencies = Object.keys(response.rates);
        this.rate = response.rates[this.selectedCurrencyTo];
      }
    })
  }

  convertFromTo() {
    this.http.get(`https://open.er-api.com/v6/latest/${this.selectedCurrencyFrom}`)
    .subscribe((response: any) => {
      this.from = true;
      this.rate = response.rates[this.selectedCurrencyTo]
      this.amountTo = this.amountFrom * response.rates[this.selectedCurrencyTo];
    });
  }

  convertToFrom() {
    this.http.get(`https://open.er-api.com/v6/latest/${this.selectedCurrencyTo}`)
    .subscribe((response: any) => {
      this.from = false;
      this.rate = response.rates[this.selectedCurrencyFrom]
      this.amountFrom = this.amountTo * response.rates[this.selectedCurrencyFrom];
    });
  }

  onAmountFromChange(value: number) {
    console.log(value);
    this.amountFrom = value;
    this.amountTo = this.from ? this.amountFrom * this.rate : this.amountFrom * 1/this.rate;
  }

  onAmountToChange(value: number) {
    this.amountTo = value;
    this.amountFrom = this.from ? this.amountTo * 1/this.rate : this.amountTo * this.rate;
  }

  onCurrencyFromChange(currency: string) {
    this.selectedCurrencyFrom = currency;
    this.convertFromTo();
  }

  onCurrencyToChange(currency: string) {
    this.selectedCurrencyTo = currency;
    this.convertToFrom();
  }
}
