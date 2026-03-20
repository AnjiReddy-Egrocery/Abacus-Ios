import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizationGameLevelsPage } from './visualization-game-levels.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizationGameLevelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizationGameLevelsPageRoutingModule {}
