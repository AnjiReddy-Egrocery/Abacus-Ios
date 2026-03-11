import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorksheetPurchasedListVisualizationTopicExamResultPageRoutingModule } from './worksheet-purchased-list-visualization-topic-exam-result-routing.module';

import { WorksheetPurchasedListVisualizationTopicExamResultPage } from './worksheet-purchased-list-visualization-topic-exam-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorksheetPurchasedListVisualizationTopicExamResultPageRoutingModule,
    WorksheetPurchasedListVisualizationTopicExamResultPage
  ],

})
export class WorksheetPurchasedListVisualizationTopicExamResultPageModule {}
