import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyPagePage } from './verify-page.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyPagePageRoutingModule {}
