import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulestopicVisualizationResultPageRoutingModule } from './schedulestopic-visualization-result-routing.module';

import { SchedulestopicVisualizationResultPage } from './schedulestopic-visualization-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulestopicVisualizationResultPageRoutingModule,
    SchedulestopicVisualizationResultPage
  ],
 
})
export class SchedulestopicVisualizationResultPageModule {}
