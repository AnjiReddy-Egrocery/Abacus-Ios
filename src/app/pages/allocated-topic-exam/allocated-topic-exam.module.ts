import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocatedTopicExamPageRoutingModule } from './allocated-topic-exam-routing.module';

import { AllocatedTopicExamPage } from './allocated-topic-exam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocatedTopicExamPageRoutingModule,
    AllocatedTopicExamPage
  ],
 
})
export class AllocatedTopicExamPageModule {}
