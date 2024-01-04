import { Component, Input } from '@angular/core';

// api
import { ApiService } from '../api.service';

// models
import MainExchange from '../../models/MainExchange';
import ResponseConverter from '../../models/Response';
import dateConverter from '../../helpers/DateConverter';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  protected mainRates: MainExchange | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getExchangeRatesUAH()
    .subscribe((response: ResponseConverter) => {
      this.mainRates = {
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
  }
}
