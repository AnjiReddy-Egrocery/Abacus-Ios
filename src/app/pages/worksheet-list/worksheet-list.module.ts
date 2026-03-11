import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorksheetListPageRoutingModule } from './worksheet-list-routing.module';

import { WorksheetListPage } from './worksheet-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorksheetListPageRoutingModule,
    WorksheetListPage
  ],

})
export class WorksheetListPageModule {}
