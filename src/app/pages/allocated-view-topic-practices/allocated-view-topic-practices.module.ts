import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllocatedViewTopicPracticesPageRoutingModule } from './allocated-view-topic-practices-routing.module';

import { AllocatedViewTopicPracticesPage } from './allocated-view-topic-practices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllocatedViewTopicPracticesPageRoutingModule,
    AllocatedViewTopicPracticesPage
  ],

})
export class AllocatedViewTopicPracticesPageModule {}
