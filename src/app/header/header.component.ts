import { Component } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';
import { CalculatorComponent } from '../calculator/calculator.component';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [MainPageComponent, CalculatorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  activeTab: string = 'main-page';

  onTabSelected(tabName: string) {
    this.activeTab = tabName;
  }
}
