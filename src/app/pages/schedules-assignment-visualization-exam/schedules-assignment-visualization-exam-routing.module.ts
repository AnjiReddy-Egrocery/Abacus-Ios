import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulesAssignmentVisualizationExamPage } from './schedules-assignment-visualization-exam.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulesAssignmentVisualizationExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulesAssignmentVisualizationExamPageRoutingModule {}
