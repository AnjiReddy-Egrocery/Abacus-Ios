import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulesAssignmentExamPage } from './schedules-assignment-exam.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulesAssignmentExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulesAssignmentExamPageRoutingModule {}
