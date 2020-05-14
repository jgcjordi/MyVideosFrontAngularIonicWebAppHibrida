import { Injectable } from '@angular/core';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export abstract class VideosService {
  abstract findVideos(query: string): Promise<Video[]>;
  abstract findVideoById(id: string): Promise<Video>;
  abstract addVideo(video: Video): Promise<Video>;
  abstract removeVideo(id: string): Promise<void>;
  abstract updateVideo(video: Video): Promise<Video>;

  constructor() { }
}
