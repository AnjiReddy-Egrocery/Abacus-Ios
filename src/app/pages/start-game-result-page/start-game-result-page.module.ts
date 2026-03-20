import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartGameResultPagePageRoutingModule } from './start-game-result-page-routing.module';

import { StartGameResultPagePage } from './start-game-result-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartGameResultPagePageRoutingModule,
    StartGameResultPagePage
  ],
  declarations: []
})
export class StartGameResultPagePageModule {}
