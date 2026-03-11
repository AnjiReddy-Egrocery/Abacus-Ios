import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulesTopicListPageRoutingModule } from './schedules-topic-list-routing.module';

import { SchedulesTopicListPage } from './schedules-topic-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulesTopicListPageRoutingModule,
    SchedulesTopicListPage
  ],
  
})
export class SchedulesTopicListPageModule {}
