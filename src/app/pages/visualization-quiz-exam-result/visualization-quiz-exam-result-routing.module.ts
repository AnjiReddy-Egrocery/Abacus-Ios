import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizationQuizExamResultPage } from './visualization-quiz-exam-result.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizationQuizExamResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizationQuizExamResultPageRoutingModule {}
