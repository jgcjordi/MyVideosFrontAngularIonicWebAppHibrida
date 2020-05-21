import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { PlaylistPropertiesPage } from '../playlist-properties/playlist-properties.page';
import { Playlist } from '../models/playlist';
import { OverlayEventDetail } from '@ionic/core';
import { PlaylistsService } from '../services/playlists.service';
import { PlaylistVideosPage } from '../playlist-videos/playlist-videos.page';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.page.html',
  styleUrls: ['./playlists.page.scss'],
})
export class PlaylistsPage implements OnInit {

  private myPlaylists: Playlist[] = [];

  constructor(private modalCtrl: ModalController, private playlistService: PlaylistsService,
    private changes: ChangeDetectorRef, private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController, ) { }

  ngOnInit() {
    console.log('ngOnInit MyVideosPage');
    let playlist0: Playlist = {
      id: "",
      title: "Empty Example",
      description: "Fill this playlist with your videos",
      thumbnail: {
        url: "/assets/playlist.png",
        width: 0,
        height: 0
      },
      date: new Date().toDateString(),
      count: 0,
      videosIds: []
    };
    this.playlistService.addPlaylist(playlist0)
      .then(() => this.searchPlaylists());
  }

  searchPlaylists() {
    console.log('[PlaylistsPage] searchPlaylists()');
    this.playlistService.findPlaylists()
      .then((playlists) => {
        this.myPlaylists = playlists;
        console.log('[PlaylistsPage] searchPlaylists() => ' + JSON.stringify(this.myPlaylists));
        this.changes.detectChanges();
      });
  }

  addPlaylist() {
    console.log(`[PlaylistsPage] addPlaylist()`);

    let playlist: Playlist = {
      id: "",
      title: "",
      description: "",
      thumbnail: {
        url: "/assets/playlist.png",
        width: 0,
        height: 0
      },
      date: new Date().toDateString(),
      count: 0,
      videosIds: []
    };
    this.modalCtrl.create({
      component: PlaylistPropertiesPage,
      componentProps: { mode: 'add', playlist: playlist }
    }).then((modal) => {
      modal.onDidDismiss()
        .then((evt: OverlayEventDetail) => {
          if (evt && evt.data) {
            this.playlistService.addPlaylist(evt.data)
              .then(() => this.searchPlaylists());
          }
        });
      modal.present();
    });
  }

  showMenu(playlist) {
    this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Open',
          icon: 'folder',
          handler: () => {
            console.log('Open playlist!!');
            this.openPlaylist(playlist);
          }
        },
        {
          text: 'Play',
          icon: 'play',
          handler: () => {
            console.log('Play playlist!!');
            //this.playVideo(video);
          }
        },
        {
          text: 'Edit',
          icon: 'pencil',
          handler: () => {
            console.log('Edit playlist!!');
            this.editPlaylist(playlist);
          }
        },
        {
          text: 'Delete',
          icon: 'trash',
          handler: () => {
            console.log('Delete playlist!!');
            this.deletePlaylist(playlist);
          }
        }
      ]
    }).then((actionSheet) => actionSheet.present());
  }

  deletePlaylist(playlist: Playlist) {
    console.log(`[PlaylistsPage] deletePlaylist(${playlist.id})`);
    this.alertCtrl.create({
      header: 'Delete playlist',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel', role: 'cancel', handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept', handler: () => {
            this.playlistService.removePlaylist(playlist.id)
              .then(() => this.searchPlaylists());
          }
        }
      ]
    }).then((alert) => alert.present());
  }

  editPlaylist(playlist: Playlist) {
    console.log(`[PlaylistsPage] editPlaylist(${playlist.id})`);
    this.modalCtrl.create({
      component: PlaylistPropertiesPage,
      componentProps: { mode: 'edit', playlist: playlist }
    })
      .then((modal) => {
        modal.onDidDismiss()
          .then((evt: OverlayEventDetail) => {
            if (evt && evt.data) {
              this.playlistService.updatePlaylist(evt.data)
                .then(() => this.searchPlaylists());
            }
          });
        modal.present();
      });
  }

  openPlaylist(playlist: Playlist) {
    console.log(`[PlaylistsPage] openPlaylist(${playlist.id})`);
    this.modalCtrl.create({
      component: PlaylistVideosPage,
      componentProps: { playlist: playlist }
    })
      .then((modal) => {
        modal.present();
      });
  }


}
