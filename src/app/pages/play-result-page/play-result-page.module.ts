import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayResultPagePageRoutingModule } from './play-result-page-routing.module';

import { PlayResultPagePage } from './play-result-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayResultPagePageRoutingModule,
    PlayResultPagePage
  ],
  
})
export class PlayResultPagePageModule {}
