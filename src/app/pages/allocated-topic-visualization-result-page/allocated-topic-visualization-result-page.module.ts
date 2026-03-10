import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocatedTopicVisualizationResultPagePageRoutingModule } from './allocated-topic-visualization-result-page-routing.module';

import { AllocatedTopicVisualizationResultPagePage } from './allocated-topic-visualization-result-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocatedTopicVisualizationResultPagePageRoutingModule,
    AllocatedTopicVisualizationResultPagePage
  ],
 
})
export class AllocatedTopicVisualizationResultPagePageModule {}
