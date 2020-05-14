import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YoutubeVideosPageRoutingModule } from './youtube-videos-routing.module';

import { YoutubeVideosPage } from './youtube-videos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YoutubeVideosPageRoutingModule
  ],
  declarations: [YoutubeVideosPage]
})
export class YoutubeVideosPageModule {}
