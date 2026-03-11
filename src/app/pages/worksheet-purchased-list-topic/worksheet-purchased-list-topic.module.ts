import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorksheetPurchasedListTopicPageRoutingModule } from './worksheet-purchased-list-topic-routing.module';

import { WorksheetPurchasedListTopicPage } from './worksheet-purchased-list-topic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorksheetPurchasedListTopicPageRoutingModule,
    WorksheetPurchasedListTopicPage
  ],
  
})
export class WorksheetPurchasedListTopicPageModule {}
