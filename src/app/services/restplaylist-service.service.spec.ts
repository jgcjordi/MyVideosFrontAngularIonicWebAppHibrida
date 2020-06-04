import { TestBed } from '@angular/core/testing';

import { RESTPlaylistServiceService } from './restplaylist-service.service';

describe('RESTPlaylistServiceService', () => {
  let service: RESTPlaylistServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RESTPlaylistServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
