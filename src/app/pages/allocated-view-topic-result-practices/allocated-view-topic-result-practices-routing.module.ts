import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllocatedViewTopicResultPracticesPage } from './allocated-view-topic-result-practices.page';

const routes: Routes = [
  {
    path: '',
    component: AllocatedViewTopicResultPracticesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllocatedViewTopicResultPracticesPageRoutingModule {}
