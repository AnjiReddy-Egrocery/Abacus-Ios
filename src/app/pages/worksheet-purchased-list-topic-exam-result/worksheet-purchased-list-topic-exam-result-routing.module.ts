import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorksheetPurchasedListTopicExamResultPage } from './worksheet-purchased-list-topic-exam-result.page';

const routes: Routes = [
  {
    path: '',
    component: WorksheetPurchasedListTopicExamResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksheetPurchasedListTopicExamResultPageRoutingModule {}
