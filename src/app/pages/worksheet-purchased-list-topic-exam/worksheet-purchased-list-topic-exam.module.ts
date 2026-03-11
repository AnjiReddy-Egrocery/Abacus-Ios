import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorksheetPurchasedListTopicExamPageRoutingModule } from './worksheet-purchased-list-topic-exam-routing.module';

import { WorksheetPurchasedListTopicExamPage } from './worksheet-purchased-list-topic-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorksheetPurchasedListTopicExamPageRoutingModule,
    WorksheetPurchasedListTopicExamPage
  ],
 
})
export class WorksheetPurchasedListTopicExamPageModule {}
