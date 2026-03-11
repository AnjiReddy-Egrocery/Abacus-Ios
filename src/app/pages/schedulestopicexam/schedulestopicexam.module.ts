import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulestopicexamPageRoutingModule } from './schedulestopicexam-routing.module';

import { SchedulestopicexamPage } from './schedulestopicexam.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulestopicexamPageRoutingModule,
    SchedulestopicexamPage
  ],
 
})
export class SchedulestopicexamPageModule {}
