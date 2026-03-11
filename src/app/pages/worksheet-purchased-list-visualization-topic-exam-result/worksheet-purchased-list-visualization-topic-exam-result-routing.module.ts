import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorksheetPurchasedListVisualizationTopicExamResultPage } from './worksheet-purchased-list-visualization-topic-exam-result.page';

const routes: Routes = [
  {
    path: '',
    component: WorksheetPurchasedListVisualizationTopicExamResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksheetPurchasedListVisualizationTopicExamResultPageRoutingModule {}
