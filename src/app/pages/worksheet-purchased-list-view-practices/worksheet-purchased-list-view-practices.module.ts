import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorksheetPurchasedListViewPracticesPageRoutingModule } from './worksheet-purchased-list-view-practices-routing.module';

import { WorksheetPurchasedListViewPracticesPage } from './worksheet-purchased-list-view-practices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorksheetPurchasedListViewPracticesPageRoutingModule,
    WorksheetPurchasedListViewPracticesPage
  ],
 
})
export class WorksheetPurchasedListViewPracticesPageModule {}
