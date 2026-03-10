import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPagePageRoutingModule } from './orders-page-routing.module';

import { OrdersPagePage } from './orders-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPagePageRoutingModule,
    OrdersPagePage
  ],

})
export class OrdersPagePageModule {}
