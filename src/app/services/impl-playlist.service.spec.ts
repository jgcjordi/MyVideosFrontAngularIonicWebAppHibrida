import { TestBed } from '@angular/core/testing';

import { ImplPlaylistService } from './impl-playlist.service';

describe('ImplPlaylistService', () => {
  let service: ImplPlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImplPlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
