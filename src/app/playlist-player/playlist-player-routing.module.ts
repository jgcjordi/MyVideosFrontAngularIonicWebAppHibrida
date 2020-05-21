import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistPlayerPage } from './playlist-player.page';

const routes: Routes = [
  {
    path: '',
    component: PlaylistPlayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistPlayerPageRoutingModule {}
