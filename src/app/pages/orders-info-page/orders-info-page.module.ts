import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersInfoPagePageRoutingModule } from './orders-info-page-routing.module';

import { OrdersInfoPagePage } from './orders-info-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersInfoPagePageRoutingModule,
    OrdersInfoPagePage
  ],

})
export class OrdersInfoPagePageModule {}
