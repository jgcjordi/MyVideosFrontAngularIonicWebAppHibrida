import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YoutubeVideosPage } from './youtube-videos.page';

const routes: Routes = [
  {
    path: '',
    component: YoutubeVideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubeVideosPageRoutingModule {}
