import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllocatedTopicExamPage } from './allocated-topic-exam.page';

const routes: Routes = [
  {
    path: '',
    component: AllocatedTopicExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllocatedTopicExamPageRoutingModule {}
