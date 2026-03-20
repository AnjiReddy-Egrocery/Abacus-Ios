import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizationQuizExamPage } from './visualization-quiz-exam.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizationQuizExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizationQuizExamPageRoutingModule {}
