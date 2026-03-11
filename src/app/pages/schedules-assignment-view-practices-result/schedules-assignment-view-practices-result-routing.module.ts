import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulesAssignmentViewPracticesResultPage } from './schedules-assignment-view-practices-result.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulesAssignmentViewPracticesResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulesAssignmentViewPracticesResultPageRoutingModule {}
