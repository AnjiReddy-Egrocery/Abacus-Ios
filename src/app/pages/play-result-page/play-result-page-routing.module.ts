import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayResultPagePage } from './play-result-page.page';

const routes: Routes = [
  {
    path: '',
    component: PlayResultPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayResultPagePageRoutingModule {}
