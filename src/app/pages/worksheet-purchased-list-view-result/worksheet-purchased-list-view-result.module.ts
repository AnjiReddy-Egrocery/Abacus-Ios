import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorksheetPurchasedListViewResultPageRoutingModule } from './worksheet-purchased-list-view-result-routing.module';

import { WorksheetPurchasedListViewResultPage } from './worksheet-purchased-list-view-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorksheetPurchasedListViewResultPageRoutingModule,
    WorksheetPurchasedListViewResultPage
  ],
 
})
export class WorksheetPurchasedListViewResultPageModule {}
