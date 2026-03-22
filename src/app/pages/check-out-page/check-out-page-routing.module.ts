import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckOutPagePage } from './check-out-page.page';

const routes: Routes = [
  {
    path: '',
    component: CheckOutPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckOutPagePageRoutingModule {}
