import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulesAssignmentViewPracticesPage } from './schedules-assignment-view-practices.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulesAssignmentViewPracticesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulesAssignmentViewPracticesPageRoutingModule {}
