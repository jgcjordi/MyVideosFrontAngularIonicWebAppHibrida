import { Injectable } from '@angular/core';
import { PlaylistsService } from './playlists.service';
import { YoutubeVideosService } from './youtube-videos.service';
import { VideosService } from './videos.service';
import { Playlist } from '../models/playlist';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Video } from '../models/video';


@Injectable({
  providedIn: 'root'
})
export class RESTPlaylistServiceService extends PlaylistsService {

  private rootUrl = 'http://localhost:8080/myvideos';

  constructor(private videos: VideosService, private youtubeVideos: YoutubeVideosService, private loginService: LoginService, private http: HttpClient) {
    super()
    this.findPlaylists().then((playlists) => {
      if(playlists.length == 0) this.chargeExamplePlaylist()
    } )
  }

  chargeExamplePlaylist() {
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
    this.addPlaylist(playlist0);
  }

  findPlaylists(): Promise<Playlist[]> {
    console.log(`[RESTPlaylistServiceService] findPlaylists()`);
    let user = this.loginService.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/playlists`;
      let params: any = { token: this.loginService.getToken() };

      this.http.get(url, { params: params })
        .subscribe(
          (playlist: Playlist[]) => { resolve(playlist); },
          (err) => { reject(err); }
        );
    });
  }

  // findPlaylistById(id: string): Playlist {
  //   console.log(`[ImplPlaylistService] findPlaylistById(${id})`);
  //   var index = this.playlists.findIndex((playlist) => playlist.id === id);
  //   return (index === -1) ? null : this.clone(this.playlists[index])
  // }

  addPlaylist(playlist: Playlist): Promise<Playlist> {
    console.log(`[RESTPlaylistServiceService] addPlaylist(${JSON.stringify(playlist)})`);
    let user = this.loginService.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/playlists`;
      this.http.post(url, playlist, { params: { token: this.loginService.getToken() } })
        .subscribe(
          (playlist: Playlist) => { resolve(playlist); },
          (err) => { reject(err); }
        );
    });
  }

  updatePlaylist(playlist: Playlist): Promise<Playlist> {
    console.log(`[RESTPlaylistServiceService] updatePlaylist(${JSON.stringify(playlist)})`);
    let user = this.loginService.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/playlists/${playlist.id}`;
      this.http.put(url, playlist, { params: { token: this.loginService.getToken() } })
        .subscribe(
          (playlist: Playlist) => { resolve(playlist); },
          (err) => { reject(err); }
        );
    });
  }

  removePlaylist(id: string): Promise<void> {
    console.log(`[RESTPlaylistServiceService] removePlaylist(${id})`);
    let user = this.loginService.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/playlists/${id}`;
      this.http.delete(url, { params: { token: this.loginService.getToken() } })
        .subscribe(
          () => { resolve(); },
          (err) => { reject(err); }
        );
    });
  }

  addVideo(playlistId: string, video: Video): Promise<void> {
    console.log('[RESTPlaylistServiceService] addVideo(' + JSON.stringify(video) + 'to playlist:' + playlistId + ')');
    let user = this.loginService.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/playlists/${playlistId}/videos`;
      this.http.post(url, video, { params: { token: this.loginService.getToken() } })
        .subscribe(
          () => { resolve(); },
          (err) => { reject(err); }
        );
    });
  }

  listVideos(playlistId: string): Promise<Video[]> {
    console.log(`[RESTPlaylistServiceService] listVideos()`);
    let user = this.loginService.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/playlists/${playlistId}/videos`;
      let params: any = { token: this.loginService.getToken() };

      this.http.get(url, { params: params })
        .subscribe(
          (video: Video[]) => { resolve(video); },
          (err) => { reject(err); }
        );
    });
  }

  removeVideo(playlistId: string, videoId: string): Promise<void> {
    console.log(`[RESTPlaylistServiceService] removeVideo(${videoId} from ${playlistId})`);
    let user = this.loginService.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/playlists/${playlistId}/videos/${videoId}`;
      this.http.delete(url, { params: { token: this.loginService.getToken() } })
        .subscribe(
          () => { resolve(); },
          (err) => { reject(err); }
        );
    });
  }
}
