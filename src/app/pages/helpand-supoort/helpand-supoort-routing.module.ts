import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpandSupoortPage } from './helpand-supoort.page';

const routes: Routes = [
  {
    path: '',
    component: HelpandSupoortPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpandSupoortPageRoutingModule {}
