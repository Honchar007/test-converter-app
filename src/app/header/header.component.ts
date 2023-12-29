import { Component, Input } from '@angular/core';

// models
import MainExchange from '../../models/MainExchange';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() mainRates: MainExchange | null = null;
}
