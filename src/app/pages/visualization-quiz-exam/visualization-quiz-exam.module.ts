import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizationQuizExamPageRoutingModule } from './visualization-quiz-exam-routing.module';

import { VisualizationQuizExamPage } from './visualization-quiz-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizationQuizExamPageRoutingModule,
    VisualizationQuizExamPage
  ],
  declarations: []
})
export class VisualizationQuizExamPageModule {}
