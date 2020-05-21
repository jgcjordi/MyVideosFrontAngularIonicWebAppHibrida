import { Injectable } from '@angular/core';
import { Playlist } from '../models/playlist';
import { Video } from '../models/video';
import { PlaylistsService } from './playlists.service';
import { YoutubeVideosService } from './youtube-videos.service';
import { MemoryVideosService } from './memory-videos.service';
import { VideosService } from './videos.service';



@Injectable()
export class ImplPlaylistService extends PlaylistsService {
  private playlists: Playlist[] = [];
  private nextId = 0;

  constructor(private videos: VideosService, private youtubeVideos: YoutubeVideosService) { super() }

  findPlaylists(): Promise<Playlist[]> {
    console.log(`[ImplPlaylistService] findPlaylists()`);
    return new Promise((resolve, reject) => {
      resolve(this.playlists);
    });
  }

  findPlaylistById(id: string): Playlist {
    console.log(`[ImplPlaylistService] findPlaylistById(${id})`);
    var index = this.playlists.findIndex((playlist) => playlist.id === id);
    return (index === -1) ? null : this.clone(this.playlists[index])
  }

  addPlaylist(playlist: Playlist): Promise<Playlist> {
    console.log('[ImplPlaylistService] addPlaylist(' + JSON.stringify(playlist) + ')');
    let _playlist = this.clone(playlist);
    _playlist.id = String(this.nextId++);
    this.playlists.push(_playlist);
    return new Promise((resolve, reject) => resolve(this.clone(_playlist)));
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
      videosIds: playlist.videosIds,
    };
  }

  removePlaylist(playlistId: string): Promise<void> {
    console.log(`[ImplPlaylistService] removePlaylist(${playlistId})`);
    var index = this.playlists.findIndex((playlist) => playlist.id === playlistId);
    if (index !== -1) {
      this.playlists.splice(index, 1);
      return new Promise((resolve, reject) => resolve());
    } else {
      return new Promise((resolve, reject) => reject(new Error(`Playlist with id ${playlistId} not found`)));
    }
  }

  updatePlaylist(playlist: Playlist): Promise<Playlist> {
    console.log('[ImplPlaylistService] updatePlaylist(' + JSON.stringify(playlist) + ')');
    var index = this.playlists.findIndex((_playlist) => _playlist.id === playlist.id);
    if (index !== -1) {
      this.playlists[index] = this.clone(playlist);
      return new Promise((resolve, reject) => resolve(this.clone(playlist)));
    } else {
      return new Promise((resolve, reject) => reject(new Error(`Playlist with id ${playlist.id} not found`)));
    }
  }

  addVideo(playlistId: string, video: Video): Promise<void> {
    console.log('[ImplPlaylistService] addVideo(' + JSON.stringify(video) + 'to playlist:' + playlistId + ')');
    let _playlist = this.findPlaylistById(playlistId);
    _playlist.videosIds.push(video.id);
    _playlist.count++;
    this.updatePlaylist(_playlist)
    return new Promise((resolve, reject) => resolve());
  }

  removeVideo(playlistId: string, videoId: string): Promise<void> {
    console.log(`[ImplPlaylistService] removeVideo(${videoId} from ${playlistId})`);
    let _playlist = this.findPlaylistById(playlistId);
    var index = _playlist.videosIds.findIndex((id) => id === videoId);
    if (index !== -1) {
      _playlist.videosIds.splice(index, 1);
      _playlist.count--;
      this.updatePlaylist(_playlist)
      return new Promise((resolve, reject) => resolve());
    } else {
      return new Promise((resolve, reject) => reject(new Error(`Video with id ${videoId} not found`)));
    }
  }

  listVideos(playlistId: string): Promise<Video[]> {
    console.log(`[ImplPlaylistService] listVideos()`);
    return new Promise((resolve, reject) => {
      let videos = [];
      let _playlist = this.findPlaylistById(playlistId)
      _playlist.videosIds.forEach((videoId) =>{
        if(this.videos.findVideoById(videoId)){
          videos.push(this.videos.findVideoById(videoId))
        }else{
          videos.push(this.youtubeVideos.findVideoById(videoId))
        }
      })
      resolve(videos);
    });
  }
}
