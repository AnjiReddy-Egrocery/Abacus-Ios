import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameLevelsPage } from './game-levels.page';

const routes: Routes = [
  {
    path: '',
    component: GameLevelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameLevelsPageRoutingModule {}
