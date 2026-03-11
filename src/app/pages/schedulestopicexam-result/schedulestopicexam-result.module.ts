import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulestopicexamResultPageRoutingModule } from './schedulestopicexam-result-routing.module';

import { SchedulestopicexamResultPage } from './schedulestopicexam-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulestopicexamResultPageRoutingModule,
    SchedulestopicexamResultPage
  ],

})
export class SchedulestopicexamResultPageModule {}
