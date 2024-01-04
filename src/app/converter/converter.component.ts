import { Component } from '@angular/core';

// api
import { ApiService } from '../api.service';
import ResponseConverter from '../../models/Response';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss'
})
export class ConverterComponent {
  protected selectedCurrencyFrom: string = 'USD';
  protected selectedCurrencyTo: string = 'UAH';
  protected rate: number = 1;
  protected amountFrom: number = 0;
  protected amountTo: number = 0;
  protected from: boolean = true;
  protected currencies: Array<string> = [];

  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getCurrencyRates()
    .subscribe((response: ResponseConverter) => {
      if(response && response.rates) {
        this.currencies = Object.keys(response.rates);
        this.rate = response.rates[this.selectedCurrencyTo];
      }
    })
  }

  convertFromTo() {
    this.apiService.getCurrencyRates(this.selectedCurrencyFrom)
    .subscribe((response: ResponseConverter) => {
      this.from = true;
      this.rate = response.rates[this.selectedCurrencyTo]
      this.amountTo = this.amountFrom * response.rates[this.selectedCurrencyTo];
    });
  }

  convertToFrom() {
    this.apiService.getCurrencyRates(this.selectedCurrencyTo)
    .subscribe((response: ResponseConverter) => {
      this.from = false;
      this.rate = response.rates[this.selectedCurrencyFrom]
      this.amountFrom = this.amountTo * response.rates[this.selectedCurrencyFrom];
    });
  }

  onAmountFromChange(value: number) {
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
