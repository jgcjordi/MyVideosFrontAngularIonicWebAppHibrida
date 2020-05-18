import { Injectable } from '@angular/core';
import { Playlist } from '../models/playlist';
import { Video } from '../models/video';
@Injectable({
  providedIn: 'root'
})
export abstract class PlaylistsService {
  abstract findPlaylists(): Promise<Playlist[]>;
  abstract addPlaylist(playlist: Playlist): Promise<Playlist>;
  abstract removePlaylist(playlistId: string): Promise<void>;
  abstract updatePlaylist(playlist: Playlist): Promise<Playlist>;
  abstract addVideo(playlistId: string, video: Video): Promise<void>;
  abstract removeVideo(playlistId: string, videoId: string): Promise<void>;
  abstract listVideos(playlistId: string): Promise<Video[]>;
}