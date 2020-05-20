import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistPropertiesPage } from './playlist-properties.page';

const routes: Routes = [
  {
    path: '',
    component: PlaylistPropertiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistPropertiesPageRoutingModule {}
