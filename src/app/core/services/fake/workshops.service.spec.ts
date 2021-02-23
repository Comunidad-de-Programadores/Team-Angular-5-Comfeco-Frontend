import { TestBed } from '@angular/core/testing';

import { WorkshopsService } from './workshops.service';

describe('WorkshopsService', () => {
  let service: WorkshopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
