import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-converter-app';
  userName: string = '';
  response: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getExchange();
  }

  getExchange() {
    this.http.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .subscribe((response) => {
      this.response = response;
      console.log(this.response);
    });
  }
}
