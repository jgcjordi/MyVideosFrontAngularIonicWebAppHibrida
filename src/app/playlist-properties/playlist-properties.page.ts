import { Component, OnInit, Input } from '@angular/core';
import { Playlist } from '../models/playlist';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-playlist-properties',
  templateUrl: './playlist-properties.page.html',
  styleUrls: ['./playlist-properties.page.scss'],
})
export class PlaylistPropertiesPage implements OnInit {

  @Input()
  private playlist: Playlist;
  @Input()
  private mode = 'view';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.playlist = this.clone(this.playlist);
  }

  close() {
    console.log('[PlaylistPropertiesPage] close()');
    this.modalCtrl.dismiss();
  }

  save() {
    console.log('[PlaylistPropertiesPage] save()');
    this.modalCtrl.dismiss(this.playlist);
  }

  private clone(playlist: Playlist): Playlist {
    return {
      id: playlist.id,
      title: playlist.title,
      description: playlist.description,
      thumbnail: {
          url: playlist.thumbnail.url,
          width: playlist.thumbnail.width,
          height: playlist.thumbnail.height,
      },
      date: playlist.date,
      count: playlist.count,
      videosIds: playlist.videosIds
    };
  }

}
