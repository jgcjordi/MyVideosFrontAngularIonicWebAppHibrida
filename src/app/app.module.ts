import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { VideosService } from './services/videos.service';
import { MemoryVideosService } from './services/memory-videos.service';
import { RESTVideosServiceService } from './services/restvideos-service.service';
import { PlaylistsService } from './services/playlists.service';
import { ImplPlaylistService } from './services/impl-playlist.service';

import { Camera } from '@ionic-native/camera/ngx';

import { VideoEditorPageModule } from './video-editor/video-editor.module';
import { VideoPlayerPageModule } from './video-player/video-player.module';
import { PlaylistPropertiesPageModule } from './playlist-properties/playlist-properties.module';
import { PlaylistSelectorPageModule } from './playlist-selector/playlist-selector.module';
import { PlaylistVideosPageModule } from './playlist-videos/playlist-videos.module';
import { PlaylistPlayerPageModule } from './playlist-player/playlist-player.module'



import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    VideoEditorPageModule,
    VideoPlayerPageModule,
    PlaylistPropertiesPageModule,
    PlaylistSelectorPageModule,
    PlaylistVideosPageModule,
    PlaylistPlayerPageModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: VideosService, useClass: RESTVideosServiceService },
    { provide: PlaylistsService, useClass: ImplPlaylistService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
