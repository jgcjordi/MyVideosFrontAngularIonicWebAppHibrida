import { TestBed } from '@angular/core/testing';

import { RESTVideosServiceService } from './restvideos-service.service';

describe('RESTVideosServiceService', () => {
  let service: RESTVideosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RESTVideosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
