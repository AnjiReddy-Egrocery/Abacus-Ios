import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllocatedTopicExamResultPagePage } from './allocated-topic-exam-result-page.page';

const routes: Routes = [
  {
    path: '',
    component: AllocatedTopicExamResultPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllocatedTopicExamResultPagePageRoutingModule {}
