import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorksheetPurchasedListViewPracticesPage } from './worksheet-purchased-list-view-practices.page';

const routes: Routes = [
  {
    path: '',
    component: WorksheetPurchasedListViewPracticesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksheetPurchasedListViewPracticesPageRoutingModule {}
