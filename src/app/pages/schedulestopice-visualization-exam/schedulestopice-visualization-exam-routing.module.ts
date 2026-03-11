import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulestopiceVisualizationExamPage } from './schedulestopice-visualization-exam.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulestopiceVisualizationExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulestopiceVisualizationExamPageRoutingModule {}
