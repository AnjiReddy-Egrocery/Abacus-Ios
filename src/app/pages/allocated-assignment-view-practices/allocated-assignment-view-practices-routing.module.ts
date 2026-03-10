import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllocatedAssignmentViewPracticesPage } from './allocated-assignment-view-practices.page';

const routes: Routes = [
  {
    path: '',
    component: AllocatedAssignmentViewPracticesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllocatedAssignmentViewPracticesPageRoutingModule {}
