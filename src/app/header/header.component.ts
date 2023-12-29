import { Component, Input } from '@angular/core';

interface ExchangeCurrency {
  "r030": Number,
  "txt": String,
  "rate": Number,
  "cc": String,
  "exchangedate": String
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() exchange: Array<ExchangeCurrency> = [];
  eurDol: Array<ExchangeCurrency> = [];
  ngOnChanges() {
    this.eurDol = this.exchange.filter((el) => el.cc == 'EUR' || el.cc == 'USD')
  }
}
