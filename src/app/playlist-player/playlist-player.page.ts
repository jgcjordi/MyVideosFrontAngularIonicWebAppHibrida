import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Playlist } from '../models/playlist';
import { Video } from '../models/video';
import { VideosService } from '../services/videos.service';
import { YoutubeVideosService } from '../services/youtube-videos.service';
import { collectExternalReferences } from '@angular/compiler';



@Component({
  selector: 'app-playlist-player',
  templateUrl: './playlist-player.page.html',
  styleUrls: ['./playlist-player.page.scss'],
})
export class PlaylistPlayerPage implements OnInit {

  @Input()
  private playlist: Playlist;

  private playlistVideosRequesting: Video[] = [];
  private playlistVideos: Video[] = [];
  private video: Video;

  constructor(private modalCtrl: ModalController, private domSanitizer: DomSanitizer,
    private youtubeVideosService: YoutubeVideosService, private videosService: VideosService) { }

  ngOnInit() {
    this.searchVideos()
  }

  close() {
    console.log('[PlaylistPlayerPage] close()');
    this.modalCtrl.dismiss();
  }

  searchVideos() {
    this.playlistVideosRequesting = []
    let requests = this.playlist.videosIds.map((videoid) => {
      return new Promise((resolve) => {
        this.searchVideo(videoid, resolve);
      });
    })
    Promise.all(requests).then(()=>{
      console.log("all requests done")
      let _playlistVideos:Video[] = []
      this.playlist.videosIds.forEach((videoid) => {
        let index = this.playlistVideosRequesting.findIndex((video) => video.id === videoid);
        _playlistVideos.push(this.playlistVideosRequesting[index])
      })
      this.playlistVideos = _playlistVideos
      this.playlistVideosRequesting = []
      this.video = this.playlistVideos[0]
    })
  }

  searchVideo(videoid: string, resolve) {
    if (Number(videoid)) {
      this.videosService.findVideoById(videoid).then(
        (localVideo) => {
          if (localVideo) {
            this.playlistVideosRequesting.push(localVideo)
            resolve()
          } else {
            let video: Video = {
              id: videoid,
              type: "local",
              url: "Deleted",
              title: "Deleted Video",
              description: "This video was removed form the app"
            }
            this.playlistVideosRequesting.push(video)
            resolve()
          }
        })
    } else {
      this.youtubeVideosService.findVideoById(videoid).then(
        (video) => {
          this.playlistVideosRequesting.push(video)
          resolve()
        })
    }
  }

  // searchVideos(): Promise<Video> {
  //   console.log('[PlaylistPlayerPage] searchVideos()');
  //   this.playlistVideos = []
  //   return new Promise((resolve, reject) => {
  //     this.playlist.videosIds.forEach((videoid) => {
  //       console.log(parseInt(videoid, 10))
  //       if (Number(videoid)) {
  //         this.videosService.findVideoById(videoid).then(
  //           (localVideo) => {
  //             if (localVideo) {
  //               this.playlistVideos.push(localVideo)
  //             } else {
  //               let video: Video = {
  //                 id: videoid,
  //                 type: "local",
  //                 url: "Deleted",
  //                 title: "Deleted Video",
  //                 description: "This video was removed form the app"
  //               }
  //               this.playlistVideos.push(video)
  //             }
  //           })
  //       } else {
  //         this.youtubeVideosService.findVideoById(videoid).then(
  //           youtubeVideo => this.playlistVideos.push(youtubeVideo))
  //       }
  //     });
  //     resolve(this.playlistVideos[0])
  //   });
  // }

  videoEnded() {
    console.log('[PlaylistPlayerPage] videoEnded()');
    var index = this.playlistVideos.findIndex((video) => video.id === this.video.id);
    index++
    console.log(index)
    if (this.playlistVideos[index]) {
      console.log(index)
      this.video = this.playlistVideos[index] 
    }
  }


}
