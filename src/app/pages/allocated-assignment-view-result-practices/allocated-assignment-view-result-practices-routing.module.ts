import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllocatedAssignmentViewResultPracticesPage } from './allocated-assignment-view-result-practices.page';

const routes: Routes = [
  {
    path: '',
    component: AllocatedAssignmentViewResultPracticesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllocatedAssignmentViewResultPracticesPageRoutingModule {}
