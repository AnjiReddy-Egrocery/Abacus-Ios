import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocatedTopicExamResultPagePageRoutingModule } from './allocated-topic-exam-result-page-routing.module';

import { AllocatedTopicExamResultPagePage } from './allocated-topic-exam-result-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocatedTopicExamResultPagePageRoutingModule,
    AllocatedTopicExamResultPagePage
  ],

})
export class AllocatedTopicExamResultPagePageModule {}
