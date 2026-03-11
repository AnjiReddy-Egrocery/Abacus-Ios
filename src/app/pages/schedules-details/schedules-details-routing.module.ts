import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulesDetailsPage } from './schedules-details.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulesDetailsPageRoutingModule {}
