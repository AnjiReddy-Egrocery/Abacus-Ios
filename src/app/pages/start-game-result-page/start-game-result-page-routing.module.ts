import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartGameResultPagePage } from './start-game-result-page.page';

const routes: Routes = [
  {
    path: '',
    component: StartGameResultPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartGameResultPagePageRoutingModule {}
