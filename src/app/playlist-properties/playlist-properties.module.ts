import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistPropertiesPageRoutingModule } from './playlist-properties-routing.module';

import { PlaylistPropertiesPage } from './playlist-properties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistPropertiesPageRoutingModule
  ],
  declarations: [PlaylistPropertiesPage]
})
export class PlaylistPropertiesPageModule {}
