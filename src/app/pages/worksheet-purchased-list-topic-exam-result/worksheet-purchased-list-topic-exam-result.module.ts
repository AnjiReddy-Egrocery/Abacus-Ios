import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorksheetPurchasedListTopicExamResultPageRoutingModule } from './worksheet-purchased-list-topic-exam-result-routing.module';

import { WorksheetPurchasedListTopicExamResultPage } from './worksheet-purchased-list-topic-exam-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorksheetPurchasedListTopicExamResultPageRoutingModule,
    WorksheetPurchasedListTopicExamResultPage
  ],
  
})
export class WorksheetPurchasedListTopicExamResultPageModule {}
