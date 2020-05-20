import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistSelectorPageRoutingModule } from './playlist-selector-routing.module';

import { PlaylistSelectorPage } from './playlist-selector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistSelectorPageRoutingModule
  ],
  declarations: [PlaylistSelectorPage]
})
export class PlaylistSelectorPageModule {}
