import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistVideosPage } from './playlist-videos.page';

const routes: Routes = [
  {
    path: '',
    component: PlaylistVideosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistVideosPageRoutingModule {}
