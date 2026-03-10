import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocatedViewTopicResultPracticesPageRoutingModule } from './allocated-view-topic-result-practices-routing.module';

import { AllocatedViewTopicResultPracticesPage } from './allocated-view-topic-result-practices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocatedViewTopicResultPracticesPageRoutingModule,
    AllocatedViewTopicResultPracticesPage
  ],
})
export class AllocatedViewTopicResultPracticesPageModule {}
