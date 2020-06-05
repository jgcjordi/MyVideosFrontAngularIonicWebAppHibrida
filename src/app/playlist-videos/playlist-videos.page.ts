import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Video } from '../models/video';
import { Playlist } from '../models/playlist';
import { VideosService } from '../services/videos.service';
import { YoutubeVideosService } from '../services/youtube-videos.service';
import { PlaylistsService } from '../services/playlists.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { VideoPlayerPage } from '../video-player/video-player.page';
import { VideoEditorPage } from '../video-editor/video-editor.page';


@Component({
  selector: 'app-playlist-videos',
  templateUrl: './playlist-videos.page.html',
  styleUrls: ['./playlist-videos.page.scss'],
})

export class PlaylistVideosPage implements OnInit {

  private playlistVideosRequesting: Video[] = [];
  private playlistVideosServer: Video[] = [];
  private playlistVideos: Video[] = [];

  @Input()
  private playlist: Playlist;

  constructor(private videosService: VideosService, private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController, private playlistService: PlaylistsService,
    private changes: ChangeDetectorRef, private youtubeVideosService: YoutubeVideosService) { }

  ngOnInit() {
    this.searchVideos()
  }

  searchVideos() {
    this.playlistVideosRequesting = []
    this.playlistService.listVideos(this.playlist.id)
      .then((videos) => {
        this.playlistVideosServer = videos
        let requests = videos.map((video) => {
          if (video.type === "youtube") {
            return new Promise((resolve) => {
              this.searchVideo(video.id, resolve);
            });
          }
        })
        Promise.all(requests).then(() => {
          console.log("all requests done")
          let _videos: Video[] = []
          videos.forEach(video => {
            let index = this.playlistVideosRequesting.findIndex((videoRequest) => video.id === videoRequest.id);
            if (index != -1) _videos.push(this.playlistVideosRequesting[index])
            else _videos.push(video)
          });
          this.playlistVideos = _videos
          this.playlistVideosRequesting = []
          this.changes.detectChanges();
        })
      });
  }

  searchVideo(videoid: string, resolve) {
    this.youtubeVideosService.findVideoById(videoid).then(
      (video) => {
        this.playlistVideosRequesting.push(video)
        resolve()
      })
  }

  close() {
    console.log('[PlaylistVideosPage] close()');
    this.modalCtrl.dismiss();
  }

  showMenu(video: Video) {
    this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Play',
          icon: 'play',
          handler: () => {
            console.log('Play video!!');
            this.playVideo(video);
          }
        },
        {
          text: 'Properties',
          icon: 'information-circle',
          handler: () => {
            console.log('Show video details!!');
            this.showVideoDetails(video)
          }
        },
        {
          text: 'Remove',
          icon: 'trash',
          handler: () => {
            console.log('Remove video!!');
            this.removeVideo(video);
          }
        }
      ]
    }).then((actionSheet) => actionSheet.present());
  }

  playVideo(video: Video) {
    console.log(`[PlaylistVideosPage] playVideo(${video.id})`);
    this.modalCtrl.create({
      component: VideoPlayerPage,
      componentProps: { video: video }
    }).then((modal) => modal.present());
  }

  showVideoDetails(video: Video) {
    console.log(`[PlaylistVideosPage] showVideoDetails(${video.id})`);
    this.modalCtrl.create({
      component: VideoEditorPage,
      componentProps: { mode: 'view', video: video }
    })
      .then(modal => modal.present()
      );
  }

  removeVideo(video: Video) {
    console.log(`[PlaylistVideosPage] removeVideo(${video.id})`);
    this.playlistService.removeVideo(this.playlist.id, video.id).then(() => this.searchVideos())
  }

  moveUp(video: Video) {
    console.log(`[PlaylistVideosPage] moveUp(${video.id})`)
    var index = this.playlist.videosIds.findIndex((videoid) => videoid === video.id);
    if (index !== 0) {
      this.playlist.videosIds.splice(index, 1)
      this.playlist.videosIds.splice(index - 1, 0, video.id)
      this.playlistService.updatePlaylist(this.playlist).then(() => this.searchVideos())
    }

  }

  moveDown(video: Video) {
    console.log("Down")
    console.log(`[PlaylistVideosPage] moveDown(${video.id})`)
    var index = this.playlist.videosIds.findIndex((videoid) => videoid === video.id);
    if (index !== this.playlist.videosIds.length - 1) {
      this.playlist.videosIds.splice(index, 1)
      this.playlist.videosIds.splice(index + 1, 0, video.id)
      this.playlistService.updatePlaylist(this.playlist).then(() => this.searchVideos())
    }
  }

}
