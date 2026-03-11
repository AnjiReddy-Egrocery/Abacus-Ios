import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulesTopicListPage } from './schedules-topic-list.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulesTopicListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulesTopicListPageRoutingModule {}
