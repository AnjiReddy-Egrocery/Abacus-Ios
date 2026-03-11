import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulestopicViewPracticesResultPage } from './schedulestopic-view-practices-result.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulestopicViewPracticesResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulestopicViewPracticesResultPageRoutingModule {}
