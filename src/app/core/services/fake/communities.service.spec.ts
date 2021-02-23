import { TestBed } from '@angular/core/testing';

import { CommunitiesService } from './communities.service';

describe('CommunitiesService', () => {
  let service: CommunitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
