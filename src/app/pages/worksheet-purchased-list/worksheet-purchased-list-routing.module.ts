import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorksheetPurchasedListPage } from './worksheet-purchased-list.page';

const routes: Routes = [
  {
    path: '',
    component: WorksheetPurchasedListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksheetPurchasedListPageRoutingModule {}
