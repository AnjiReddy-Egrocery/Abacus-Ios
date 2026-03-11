import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorksheetPurchasedListPageRoutingModule } from './worksheet-purchased-list-routing.module';

import { WorksheetPurchasedListPage } from './worksheet-purchased-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorksheetPurchasedListPageRoutingModule,
    WorksheetPurchasedListPage
  ],

})
export class WorksheetPurchasedListPageModule {}
