import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorksheetPurchasedListTopicPage } from './worksheet-purchased-list-topic.page';

const routes: Routes = [
  {
    path: '',
    component: WorksheetPurchasedListTopicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksheetPurchasedListTopicPageRoutingModule {}
