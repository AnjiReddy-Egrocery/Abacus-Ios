import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizationPlaywithNumbersPage } from './visualization-playwith-numbers.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizationPlaywithNumbersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizationPlaywithNumbersPageRoutingModule {}
