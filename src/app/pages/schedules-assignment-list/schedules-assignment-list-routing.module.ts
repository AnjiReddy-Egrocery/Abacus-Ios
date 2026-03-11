import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulesAssignmentListPage } from './schedules-assignment-list.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulesAssignmentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulesAssignmentListPageRoutingModule {}
