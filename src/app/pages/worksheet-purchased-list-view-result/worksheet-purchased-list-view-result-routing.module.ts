import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorksheetPurchasedListViewResultPage } from './worksheet-purchased-list-view-result.page';

const routes: Routes = [
  {
    path: '',
    component: WorksheetPurchasedListViewResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksheetPurchasedListViewResultPageRoutingModule {}
