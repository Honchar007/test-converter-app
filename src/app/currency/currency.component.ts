import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss'
})
export class CurrencyComponent {
  @Input() public currencies: string[] = [];
  @Input() public amount: number = 0;
  @Input() public selectedCurrency: string = '';

  @Output() protected amountChange = new EventEmitter<number>();
  @Output() protected currencyChange = new EventEmitter<string>();

  onAmountChange(value: number) {
    this.amountChange.emit(value);
  }

  onCurrencyChange(value: string) {
    this.currencyChange.emit(value);
  }
}
