import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { BattleComponent } from './battle/battle.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'battle', component: BattleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
