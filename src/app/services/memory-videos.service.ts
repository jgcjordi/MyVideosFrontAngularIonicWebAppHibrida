import { Injectable } from '@angular/core';
import { Video } from '../models/video';
import { VideosService } from './videos.service';
@Injectable()
export class MemoryVideosService extends VideosService {
  private videos: Video[] = [];
  private nextId = 1;

  constructor() { super(); }

  readVideoInfo(video: Video, secs?: number): Promise<Video> {
    return new Promise((resolve, reject) => {
      let url = video.url
      let videoNode: HTMLVideoElement = document.createElement('video');
      videoNode.onloadedmetadata = () => {
        // - get basic info
        video.width = videoNode.videoWidth;
        video.height = videoNode.videoHeight;
        video.duration = String(videoNode.duration) + ' secs';
        // - move to frame
        videoNode.currentTime = secs ? Math.min(secs, videoNode.duration) : 0;
      };
      videoNode.onseeked = (ev) => {
        // - capture thumbnail
        try {
          let canvas = document.createElement('canvas');
          canvas.height = videoNode.videoHeight;
          canvas.width = videoNode.videoWidth;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(videoNode, 0, 0, canvas.width, canvas.height);
          video.thumbnail = {
            url: canvas.toDataURL(),
            height: canvas.height,
            width: canvas.width
          };
        } catch (err) {
          console.log('videoNode.onseeked_error=' + JSON.stringify(err));
        } finally {
          resolve(video);
        }
      };
      videoNode.onerror = (ev) => {
        let error = {
          code: videoNode.error.code, message:
            videoNode.error.message
        };
        reject(error);
      };
      videoNode.src = url;
    });
  }


  findVideos(query: string): Promise<Video[]> {
    console.log(`[MemoryVideosService] findVideos(${query})`);
    return new Promise((resolve, reject) => {
      let _videos = this.videos.filter((video) => {
        return video.title.indexOf(query) !== -1;
      }).map((video) => this.clone(video));
      resolve(_videos);
    });
  }
  findVideoById(id: string): Promise<Video> {
    console.log(`[MemoryVideosService] findVideoById(${id})`);
    var index = this.videos.findIndex((video) => video.id === id);
    return new Promise((resolve, reject) => {
      resolve((index === -1) ? null : this.clone(this.videos[index]));
    });
  }
  addVideo(video: Video): Promise<Video> {
    console.log('[MemoryVideosService] addVideo(' + JSON.stringify(video) +
      ')');
    let _video = this.clone(video);
    _video.id = String(this.nextId++);
    this.videos.push(_video);
    return new Promise((resolve, reject) => resolve(this.clone(_video)));
  }

  removeVideo(id: string): Promise<void> {
    console.log(`[MemoryVideosService] removeVideo(${id})`);
    var index = this.videos.findIndex((video) => video.id === id);
    if (index !== -1) {
      this.videos.splice(index, 1);
      return new Promise((resolve, reject) => resolve());
    } else {
      return new Promise((resolve, reject) => reject(new Error(`Video with id ${id} not found`)));
    }
  }

  updateVideo(video: Video): Promise<Video> {
    console.log('[MemoryVideosService] updateVideo(' + JSON.stringify(video) +
      ')');
    var index = this.videos.findIndex((_video) => _video.id === video.id);
    if (index !== -1) {
      this.videos[index] = this.clone(video);
      return new Promise((resolve, reject) => resolve(this.clone(video)));
    } else {
      return new Promise((resolve, reject) => reject(new Error(`Video with id ${video.id} not found`)));
    }
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