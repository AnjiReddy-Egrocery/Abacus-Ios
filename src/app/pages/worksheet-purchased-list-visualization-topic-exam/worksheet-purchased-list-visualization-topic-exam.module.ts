import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorksheetPurchasedListVisualizationTopicExamPageRoutingModule } from './worksheet-purchased-list-visualization-topic-exam-routing.module';

import { WorksheetPurchasedListVisualizationTopicExamPage } from './worksheet-purchased-list-visualization-topic-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorksheetPurchasedListVisualizationTopicExamPageRoutingModule,
    WorksheetPurchasedListVisualizationTopicExamPage
  ],
 
})
export class WorksheetPurchasedListVisualizationTopicExamPageModule {}
