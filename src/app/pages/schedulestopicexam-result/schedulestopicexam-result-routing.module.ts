import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulestopicexamResultPage } from './schedulestopicexam-result.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulestopicexamResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulestopicexamResultPageRoutingModule {}
