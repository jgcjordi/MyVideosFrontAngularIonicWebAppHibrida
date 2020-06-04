import { Injectable } from '@angular/core';
import { Video } from '../models/video';
import { VideosService } from './videos.service';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RESTVideosServiceService extends VideosService {

  private rootUrl = 'http://localhost:8080/myvideos';

  constructor(private loginService: LoginService, private http: HttpClient) {
    super();
  }

  readVideoInfo(url: string, secs?: number): Promise<Video> {
    console.log(`readVideoInfo(${url},${secs})`);
    return new Promise((resolve, reject) => {
      let video: Video = {
        type: 'local',
        url: url,
        title: '',
        description: '',
        date: new Date().toDateString()
      };
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
    console.log(`[RESTVideosServiceService] findVideos(${query})`);
    let user = this.loginService.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/videos`;
      let params: any = { token: this.loginService.getToken() };
      if (query) {
        params.q = query
      }
      this.http.get(url, { params: params })
        .subscribe(
          (videos: Video[]) => { resolve(videos); },
          (err) => { reject(err); }
        );
    });
  }

  findVideoById(id: string): Promise<Video> {
    console.log(`[RESTVideosServiceService] findVideoById(${id})`);
    let user = this.loginService.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/videos/${id}`;
      let params: any = { token: this.loginService.getToken() };
      this.http.get(url, { params: params })
        .subscribe(
          (video: Video) => { resolve(video); },
          (err) => { reject(err); }
        );
    });
  }

  addVideo(video: Video): Promise<Video> {
    console.log(`[RESTVideosServiceService] addVideo(${JSON.stringify(video)})`);
    let user = this.loginService.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/videos`;
      this.http.post(url, video, { params: { token: this.loginService.getToken() } })
        .subscribe(
          (video: Video) => { resolve(video); },
          (err) => { reject(err); }
        );
    });
  }

  removeVideo(id: string): Promise<void> {
    console.log(`[RESTVideosServiceService] removeVideo(${id})`);
    let user = this.loginService.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/videos/${id}`;
      this.http.delete(url, { params: { token: this.loginService.getToken() } })
        .subscribe(
          () => { resolve(); },
          (err) => { reject(err); }
        );
    });
  }

  updateVideo(video: Video): Promise<Video> {
    console.log(`[RESTVideosServiceService] updateVideo(${JSON.stringify(video)})`);
    let user = this.loginService.getUser();
    return new Promise((resolve, reject) => {
      let url = this.rootUrl + `/users/${user.id}/videos/${video.id}`;
      this.http.put(url, video, { params: { token: this.loginService.getToken() } })
        .subscribe(
          (video: Video) => { resolve(video); },
          (err) => { reject(err); }
        );
    });
  }
}

