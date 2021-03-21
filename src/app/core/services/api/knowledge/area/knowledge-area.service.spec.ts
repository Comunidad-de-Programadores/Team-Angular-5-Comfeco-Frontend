import { TestBed } from '@angular/core/testing';

import { KnowledgeAreaService } from './knowledge-area.service';

describe('KnowledgeAreaService', () => {
  let service: KnowledgeAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnowledgeAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
