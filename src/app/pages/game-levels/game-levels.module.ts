import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameLevelsPageRoutingModule } from './game-levels-routing.module';

import { GameLevelsPage } from './game-levels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameLevelsPageRoutingModule,
    GameLevelsPage
  ],
 
})
export class GameLevelsPageModule {}
