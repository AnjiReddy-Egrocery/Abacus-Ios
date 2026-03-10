import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersInfoPagePage } from './orders-info-page.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersInfoPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersInfoPagePageRoutingModule {}
