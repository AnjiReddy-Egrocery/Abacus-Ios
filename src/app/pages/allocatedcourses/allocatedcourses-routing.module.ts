import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllocatedcoursesPage } from './allocatedcourses.page';

const routes: Routes = [
  {
    path: '',
    component: AllocatedcoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllocatedcoursesPageRoutingModule {}
