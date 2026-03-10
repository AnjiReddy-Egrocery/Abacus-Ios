import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllocatedTopicVisualizationExamPage } from './allocated-topic-visualization-exam.page';

const routes: Routes = [
  {
    path: '',
    component: AllocatedTopicVisualizationExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllocatedTopicVisualizationExamPageRoutingModule {}
