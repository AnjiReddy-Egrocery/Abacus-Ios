import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppProgressPageRoutingModule } from './app-progress-routing.module';

import { AppProgressPage } from './app-progress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppProgressPageRoutingModule,
    AppProgressPage
  ],
  
})
export class AppProgressPageModule {}
