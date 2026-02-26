import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppProgressPage } from './app-progress.page';

const routes: Routes = [
  {
    path: '',
    component: AppProgressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppProgressPageRoutingModule {}
