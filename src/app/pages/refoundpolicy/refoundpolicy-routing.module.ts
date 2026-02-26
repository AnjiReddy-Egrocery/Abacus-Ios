import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RefoundpolicyPage } from './refoundpolicy.page';

const routes: Routes = [
  {
    path: '',
    component: RefoundpolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefoundpolicyPageRoutingModule {}
