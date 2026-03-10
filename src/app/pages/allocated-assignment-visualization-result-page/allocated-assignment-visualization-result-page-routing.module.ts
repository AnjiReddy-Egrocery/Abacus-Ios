import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllocatedAssignmentVisualizationResultPagePage } from './allocated-assignment-visualization-result-page.page';

const routes: Routes = [
  {
    path: '',
    component: AllocatedAssignmentVisualizationResultPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllocatedAssignmentVisualizationResultPagePageRoutingModule {}
