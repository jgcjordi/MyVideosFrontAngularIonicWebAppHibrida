import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'my-videos',
    loadChildren: () => import('./my-videos/my-videos.module').then(m => m.MyVideosPageModule)
  },
  {
    path: 'youtube-videos',
    loadChildren: () => import('./youtube-videos/youtube-videos.module').then(m => m.YoutubeVideosPageModule)
  },
  {
    path: 'playlists',
    loadChildren: () => import('./playlists/playlists.module').then(m => m.PlaylistsPageModule)
  },
  {
    path: 'video-editor',
    loadChildren: () => import('./video-editor/video-editor.module').then(m => m.VideoEditorPageModule)
  },
  {
    path: 'video-player',
    loadChildren: () => import('./video-player/video-player.module').then(m => m.VideoPlayerPageModule)
  },
  {
    path: 'playlist-properties',
    loadChildren: () => import('./playlist-properties/playlist-properties.module').then(m => m.PlaylistPropertiesPageModule)
  },
  {
    path: 'playlist-selector',
    loadChildren: () => import('./playlist-selector/playlist-selector.module').then(m => m.PlaylistSelectorPageModule)
  },
  {
    path: 'playlist-videos',
    loadChildren: () => import('./playlist-videos/playlist-videos.module').then(m => m.PlaylistVideosPageModule)
  },
  {
    path: 'playlist-player',
    loadChildren: () => import('./playlist-player/playlist-player.module').then(m => m.PlaylistPlayerPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
