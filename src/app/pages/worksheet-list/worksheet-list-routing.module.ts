import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorksheetListPage } from './worksheet-list.page';

const routes: Routes = [
  {
    path: '',
    component: WorksheetListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorksheetListPageRoutingModule {}
