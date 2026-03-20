import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizationGameLevelsPageRoutingModule } from './visualization-game-levels-routing.module';

import { VisualizationGameLevelsPage } from './visualization-game-levels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizationGameLevelsPageRoutingModule,
    VisualizationGameLevelsPage
  ],
  declarations: []
})
export class VisualizationGameLevelsPageModule {}
