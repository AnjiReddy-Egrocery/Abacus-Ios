import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizationExamResultPage } from './visualization-exam-result.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizationExamResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizationExamResultPageRoutingModule {}
