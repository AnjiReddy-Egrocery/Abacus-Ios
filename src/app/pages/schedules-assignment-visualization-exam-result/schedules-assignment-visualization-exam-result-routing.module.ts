import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulesAssignmentVisualizationExamResultPage } from './schedules-assignment-visualization-exam-result.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulesAssignmentVisualizationExamResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulesAssignmentVisualizationExamResultPageRoutingModule {}
