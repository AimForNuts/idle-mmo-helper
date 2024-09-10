import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  result: number = 0;

  calculate(value1: number, value2: number, operation: string) {
    switch (operation) {
      case 'add':
        this.result = value1 + value2;
        break;
      case 'subtract':
        this.result = value1 - value2;
        break;
      case 'multiply':
        this.result = value1 * value2;
        break;
      case 'divide':
        this.result = value1 / value2;
        break;
    }
  }
}
