import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorksheetPurchasedListVisualizationTopicExamPage } from './worksheet-purchased-list-visualization-topic-exam.page';

const routes: Routes = [
  {
    path: '',
    component: WorksheetPurchasedListVisualizationTopicExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksheetPurchasedListVisualizationTopicExamPageRoutingModule {}
