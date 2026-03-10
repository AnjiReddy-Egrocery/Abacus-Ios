import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllocatedCourseLevelsPage } from './allocated-course-levels.page';

const routes: Routes = [
  {
    path: '',
    component: AllocatedCourseLevelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllocatedCourseLevelsPageRoutingModule {}
