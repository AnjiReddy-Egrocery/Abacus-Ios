import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulestopicexamPage } from './schedulestopicexam.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulestopicexamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulestopicexamPageRoutingModule {}
