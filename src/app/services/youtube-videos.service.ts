import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VideosService } from './videos.service';
import { Video } from '../models/video';
@Injectable({
  providedIn: 'root'
})
export class YoutubeVideosService extends VideosService {
  private urlBase = 'https://www.googleapis.com/youtube/v3';
  private key = 'AIzaSyAX05IPm-9yTzB4s7AxCEAG6nXvczP7Cn4';
  private maxResults = 25;
  constructor(private http: HttpClient) { super(); }
  findVideos(query: string): Promise<Video[]> {
    console.log(`[YoutubeVideosService] findVideos(${query})`);
    return new Promise((resolve, reject) => {
      let params: { [param: string]: string } = {
        key: this.key,
        maxResults: String(this.maxResults),
        part: 'snippet',
        q: query,
        type: 'video'
      };
      this.http.get(`${this.urlBase}/search`, { params: params })
        .subscribe((data: any) => {
          console.log(`[YoutubeVideosService] findVideos(${query}) SUCCESS.`);
          let videos = data.items.map((item) => {
            let video = this.clone(item);
            return video;
          });
          resolve(videos);
        }, (err) => {
          console.log(`[YoutubeVideosService] findVideos(${query}) ERROR: ` +
            JSON.stringify(err));
          reject(err);
        });
    });
  }
  findVideoById(id: string): Promise<Video> {
    console.log(`[YoutubeVideosService] findVideoById(${id})`);
    return new Promise((resolve, reject) => {
      let params: { [param: string]: string } = {
        key: this.key,
        id: id,
        part: 'snippet,contentDetails,player'
      };
      this.http.get(`${this.urlBase}/videos`, { params: params })
        .subscribe((data: any) => {
          console.log(`[YoutubeVideosService] findVideoById(${id}) SUCCESS.`);
          let video = this.clone(data.items[0]);
          resolve(video);
        }, (err) => {
          console.log(`[YoutubeVideosService] findVideoById(${id}) ERROR: ` +
            JSON.stringify(err));
          reject(err);
        });
    });
  }
  addVideo(video: Video): Promise<Video> {
    console.log('[YoutubeVideosService] addVideo(' + JSON.stringify(video) +
      ')');
    return new Promise((resolve, reject) => {
      reject(new Error('Not supported operation'));
    });
  }
  removeVideo(id: string): Promise<void> {
    console.log(`[YoutubeVideosService] removeVideo(${id})`);
    return new Promise((resolve, reject) => {
      reject(new Error('Not supported operation'));
    });
  }
  updateVideo(video: Video): Promise<Video> {
    console.log('[YoutubeVideosService] updateVideo(' + JSON.stringify(video) +
      ')');
    return new Promise((resolve, reject) => {
      reject(new Error('Not supported operation'));
    });
  }
  private clone(video: any): Video {
    let id = video.id.videoId || video.id;
    let clone: Video = {
      id: id,
      type: 'youtube',
      url: `https://www.youtube.com/embed/${id}`,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: {
        url: video.snippet.thumbnails.high.url,
        width: video.snippet.thumbnails.high.width,
        height: video.snippet.thumbnails.high.height
      },
      date: video.snippet.publishedAt
    };
    if (video.snippet.tags) {
      clone.tags = video.snippet.tags.join(',');
    }
    if (video.contentDetails) {
      clone.duration = video.contentDetails.duration;
    }
    if (video.player) {
      clone.width = video.player.embedWidth;
      clone.height = video.player.embedHeight;
    }
    console.log('[YoutubeVideosService] clone() => ' + JSON.stringify(clone));
    return clone;
  }
}