import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersPagePage } from './orders-page.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPagePageRoutingModule {}
