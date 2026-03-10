import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocatedTopicVisualizationExamPageRoutingModule } from './allocated-topic-visualization-exam-routing.module';

import { AllocatedTopicVisualizationExamPage } from './allocated-topic-visualization-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocatedTopicVisualizationExamPageRoutingModule,
    AllocatedTopicVisualizationExamPage
  ],
  
})
export class AllocatedTopicVisualizationExamPageModule {}
