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

  private playlistVideos: Video[] = [];
  private video: Video;

  constructor(private modalCtrl: ModalController, private domSanitizer: DomSanitizer,
    private youtubeVideosService: YoutubeVideosService, private videosService: VideosService) { }

  ngOnInit() {
    this.searchVideos().then(() => {
      this.video = this.playlistVideos[0]
      console.log(this.video)
    })
  }

  close() {
    console.log('[PlaylistPlayerPage] close()');
    this.modalCtrl.dismiss();
  }

  searchVideos(): Promise<Video> {
    console.log('[PlaylistPlayerPage] searchVideos()');
    this.playlistVideos = []
    return new Promise((resolve, reject) => {
      this.playlist.videosIds.forEach((videoid) => {
        console.log(parseInt(videoid, 10))
        if (Number(videoid)) {
          this.videosService.findVideoById(videoid).then(
            (localVideo) => {
              if (localVideo) {
                this.playlistVideos.push(localVideo)
              } else {
                let video: Video = {
                  id: videoid,
                  type: "local",
                  url: "Deleted",
                  title: "Deleted Video",
                  description: "This video was removed form the app"
                }
                this.playlistVideos.push(video)
              }
            })
        } else {
          this.youtubeVideosService.findVideoById(videoid).then(
            youtubeVideo => this.playlistVideos.push(youtubeVideo))
        }
      });
      resolve(this.playlistVideos[0])
    });
  }

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
