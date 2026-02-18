import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaywithNumbersPageRoutingModule } from './playwith-numbers-routing.module';

import { PlaywithNumbersPage } from './playwith-numbers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaywithNumbersPageRoutingModule
  ],
  declarations: [PlaywithNumbersPage]
})
export class PlaywithNumbersPageModule {}
