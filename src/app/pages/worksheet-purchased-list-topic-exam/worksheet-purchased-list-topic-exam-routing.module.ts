import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorksheetPurchasedListTopicExamPage } from './worksheet-purchased-list-topic-exam.page';

const routes: Routes = [
  {
    path: '',
    component: WorksheetPurchasedListTopicExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksheetPurchasedListTopicExamPageRoutingModule {}
