import { TestBed } from '@angular/core/testing';

import { MemoryVideosService } from './memory-videos.service';

describe('MemoryVideosService', () => {
  let service: MemoryVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemoryVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
