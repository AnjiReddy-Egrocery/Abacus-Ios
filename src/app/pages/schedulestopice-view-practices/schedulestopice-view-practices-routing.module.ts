import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulestopiceViewPracticesPage } from './schedulestopice-view-practices.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulestopiceViewPracticesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulestopiceViewPracticesPageRoutingModule {}
