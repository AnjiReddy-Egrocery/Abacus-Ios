import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllocatedViewTopicPracticesPage } from './allocated-view-topic-practices.page';

const routes: Routes = [
  {
    path: '',
    component: AllocatedViewTopicPracticesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllocatedViewTopicPracticesPageRoutingModule {}
