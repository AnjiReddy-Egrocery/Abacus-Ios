import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllocatedAssignmentVisualizationExamPage } from './allocated-assignment-visualization-exam.page';

const routes: Routes = [
  {
    path: '',
    component: AllocatedAssignmentVisualizationExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllocatedAssignmentVisualizationExamPageRoutingModule {}
