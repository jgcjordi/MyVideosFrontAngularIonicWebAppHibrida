import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../models/video';
import { PlaylistsService } from '../services/playlists.service';
import { Playlist } from '../models/playlist';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-playlist-selector',
  templateUrl: './playlist-selector.page.html',
  styleUrls: ['./playlist-selector.page.scss'],
})
export class PlaylistSelectorPage implements OnInit {
  private myPlaylists: Playlist[] = [];

  @Input()
  private video: Video;

  constructor(private playlistService: PlaylistsService, private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('ngOnInit PlaylistSelectorPage');
    this.video = this.clone(this.video);
    this.searchPlaylists();
  }

  searchPlaylists() {
    console.log('[PlaylistSelectorPage] searchPlaylists()');
    this.playlistService.findPlaylists()
      .then((playlists) => {
        this.myPlaylists = playlists;
        console.log('[PlaylistSelectorPage] searchPlaylists() => ' + JSON.stringify(this.myPlaylists));
      });
  }

  cancel() {
    console.log('[PlaylistSelectorPage] cancel()');
    this.modalCtrl.dismiss();
  }

  addToPlaylist(playlist: Playlist) {
    console.log('[VideoEditorPage] addToPlaylist()');
    this.modalCtrl.dismiss(playlist.id);
  }

  private clone(video: Video): Video {
    return {
      id: video.id,
      type: video.type,
      url: video.url,
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail,
      tags: video.tags,
      duration: video.duration,
      date: video.date,
      width: video.width,
      height: video.height
    };
  }

}
