import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllocatedAssignmentExamPage } from './allocated-assignment-exam.page';

const routes: Routes = [
  {
    path: '',
    component: AllocatedAssignmentExamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllocatedAssignmentExamPageRoutingModule {}
