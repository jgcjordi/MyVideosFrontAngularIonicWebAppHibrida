import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistPlayerPageRoutingModule } from './playlist-player-routing.module';

import { PlaylistPlayerPage } from './playlist-player.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistPlayerPageRoutingModule
  ],
  declarations: [PlaylistPlayerPage]
})
export class PlaylistPlayerPageModule {}
